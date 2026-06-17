import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { competencyByKey } from "@/constants/competencies";
import type { CaseDetail, CaseEntry, CaseStatus, ContentBlock } from "@/lib/types";

const CASES_ROOT = path.join(process.cwd(), "public", "work");
const CASE_FILE = "case.md";

type CaseFrontmatter = {
  title: string;
  client?: string;
  slug?: string;
  aspect?: CaseEntry["aspect"];
  role?: string;
  featured?: boolean;
  status?: CaseStatus;
  order?: number;
  competencies?: string[];
  coverType?: "image" | "video" | "link";
  coverUrl?: string;
  liveLink?: string;
  liveLinkLabel?: string;
  intro?: string;
  content?: ContentBlock[];
};

function listCaseFolders(): string[] {
  if (!fs.existsSync(CASES_ROOT)) return [];
  return fs
    .readdirSync(CASES_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((folder) => fs.existsSync(path.join(CASES_ROOT, folder, CASE_FILE)));
}

function readCaseFile(folder: string): CaseFrontmatter | null {
  const filePath = path.join(CASES_ROOT, folder, CASE_FILE);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw).data as CaseFrontmatter;
}

function toCaseEntry(folder: string, data: CaseFrontmatter): CaseEntry {
  return {
    id: folder,
    title: data.title ?? folder,
    client: data.client,
    slug: data.slug ?? folder,
    aspect: data.aspect,
    role: data.role,
    featured: data.featured ?? false,
    status: data.status === "published" ? "published" : "draft",
    competencies: (data.competencies ?? [])
      .map((key) => competencyByKey(key))
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)),
    coverMedia: { coverType: data.coverType ?? "image", coverUrl: data.coverUrl },
  };
}

function sortCases(entries: { folder: string; data: CaseFrontmatter; entry: CaseEntry }[]) {
  return entries.sort((a, b) => {
    const orderA = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.data.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return a.entry.title.localeCompare(b.entry.title);
  });
}

function getAllCases(): { folder: string; data: CaseFrontmatter; entry: CaseEntry }[] {
  const records = listCaseFolders()
    .map((folder) => {
      const data = readCaseFile(folder);
      if (!data) return null;
      return { folder, data, entry: toCaseEntry(folder, data) };
    })
    .filter((record): record is { folder: string; data: CaseFrontmatter; entry: CaseEntry } =>
      Boolean(record)
    );

  return sortCases(records);
}

export function getCaseSlugs(): string[] {
  return getAllCases().map((record) => record.entry.slug);
}

export function getCases(): CaseEntry[] {
  return getAllCases()
    .filter((record) => record.entry.featured && record.entry.status === "published")
    .map((record) => record.entry);
}

export function getDraftCases(): CaseEntry[] {
  return getAllCases()
    .filter((record) => record.entry.status === "draft")
    .map((record) => record.entry);
}

export function getCaseBySlug(slug: string): CaseDetail | null {
  const records = getAllCases();
  const match = records.find((record) => record.entry.slug === slug);
  if (!match) return null;

  const relatedCases = records
    .filter(
      (record) =>
        record.entry.featured &&
        record.entry.status === "published" &&
        record.entry.id !== match.entry.id
    )
    .map((record) => record.entry);

  return {
    ...match.entry,
    intro: match.data.intro,
    liveLink: match.data.liveLink,
    liveLinkLabel: match.data.liveLinkLabel,
    content: match.data.content ?? [],
    relatedCases,
  };
}
