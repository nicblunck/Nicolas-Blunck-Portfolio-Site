import { competencyByKey } from "@/constants/competencies";
import type { CaseDetail, CaseEntry, CoverMedia } from "@/lib/types";

const CRAFT_BASE_URL = "https://connect.craft.do/links/4CzEKnYRKSV/api/v1";
const CASES_COLLECTION_NAME = "Cases";

type CraftCollection = { id: string; title?: string; name?: string };
type CraftCollectionItem = {
  id: string;
  properties?: Record<string, unknown>;
  fields?: Record<string, unknown>;
};

async function craftFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.CRAFT_API_TOKEN;
  if (!token) {
    throw new Error("CRAFT_API_TOKEN is not set");
  }

  const res = await fetch(`${CRAFT_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Craft API ${path} failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readProp(item: CraftCollectionItem, key: string): unknown {
  const source = item.properties ?? item.fields ?? item;
  return (source as Record<string, unknown>)[key];
}

function toCompetencies(raw: unknown) {
  const keys = Array.isArray(raw)
    ? raw.map(String)
    : typeof raw === "string"
      ? raw.split(",").map((value) => value.trim())
      : [];

  return keys
    .map((key) => competencyByKey(key))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
}

function mapCaseEntry(item: CraftCollectionItem): CaseEntry {
  const coverMedia: CoverMedia = {
    coverType: (asString(readProp(item, "coverType")) as CoverMedia["coverType"]) ?? "image",
    coverUrl: asString(readProp(item, "coverUrl")),
  };

  return {
    id: item.id,
    title: asString(readProp(item, "title")) ?? "",
    client: asString(readProp(item, "client")),
    slug: asString(readProp(item, "slug")) ?? item.id,
    aspect: asString(readProp(item, "aspect")) as CaseEntry["aspect"],
    role: asString(readProp(item, "role")),
    featured: Boolean(readProp(item, "featured")),
    competencies: toCompetencies(readProp(item, "competencies")),
    coverMedia,
  };
}

let casesCollectionId: string | null = null;

async function getCasesCollectionId(): Promise<string> {
  if (casesCollectionId) return casesCollectionId;

  const { collections } = await craftFetch<{ collections: CraftCollection[] }>("/collections");
  const match = collections.find(
    (collection) =>
      (collection.title ?? collection.name ?? "").toLowerCase() ===
      CASES_COLLECTION_NAME.toLowerCase()
  );

  if (!match) {
    throw new Error(`Craft collection "${CASES_COLLECTION_NAME}" not found`);
  }

  casesCollectionId = match.id;
  return match.id;
}

async function getCaseItems(): Promise<CraftCollectionItem[]> {
  const collectionId = await getCasesCollectionId();
  const { items } = await craftFetch<{ items: CraftCollectionItem[] }>(
    `/collections/${collectionId}/items`
  );
  return items;
}

export async function getCases(): Promise<CaseEntry[]> {
  try {
    const items = await getCaseItems();
    return items.map(mapCaseEntry).filter((entry) => entry.featured);
  } catch (error) {
    console.error("[craft] getCases failed:", error);
    return [];
  }
}

export async function getCaseBySlug(slug: string): Promise<CaseDetail | null> {
  try {
    const items = await getCaseItems();
    const match = items.find((item) => asString(readProp(item, "slug")) === slug);
    if (!match) return null;

    const entry = mapCaseEntry(match);
    const relatedCases = items
      .map(mapCaseEntry)
      .filter((other) => other.featured && other.id !== entry.id);

    return {
      ...entry,
      intro: asString(readProp(match, "intro")),
      liveLink: asString(readProp(match, "liveLink")),
      liveLinkLabel: asString(readProp(match, "liveLinkLabel")),
      // Long-form body blocks (metrics/section/quote) aren't parsed from the
      // Craft document yet — needs a real case row to design the
      // heading convention against.
      content: [],
      relatedCases,
    };
  } catch (error) {
    console.error("[craft] getCaseBySlug failed:", error);
    return null;
  }
}
