import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { competencyByKey } from "@/constants/competencies";
import type {
  CaseDetail,
  CaseEntry,
  CompetencyEntry,
  ContentBlock,
  CoverMedia,
  GalleryItem,
  MetricEntry,
} from "@/lib/types";

// Case studies are authored as markdown files in `content/cases/`. The file
// name (without extension) is the slug, the YAML frontmatter holds metadata,
// and the markdown body is parsed into the section/quote content blocks the
// case page renders. Drop a new `.md` file in that folder to add a case.

const CASES_DIR = path.join(process.cwd(), "content", "cases");
const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov)(\?|#|$)/i;
const ASPECTS = new Set(["9-16", "3-4", "1-1", "3-2"]);

function isVideoUrl(url: string): boolean {
  return VIDEO_EXTENSIONS.test(url);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function toCompetencies(raw: unknown): CompetencyEntry[] {
  const keys = Array.isArray(raw)
    ? raw.map(String)
    : typeof raw === "string"
      ? raw.split(",").map((value) => value.trim())
      : [];

  return keys
    .map((key) => competencyByKey(key))
    .filter((entry): entry is CompetencyEntry => Boolean(entry));
}

function toMetrics(raw: unknown): MetricEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const record = (item ?? {}) as Record<string, unknown>;
      return {
        value: asString(record.value),
        label: asString(record.label),
      };
    })
    .filter((metric) => metric.value || metric.label);
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)\s*$/;
const HEADING_LINE = /^##\s+(.*\S)\s*$/;
const QUOTE_LINE = /^>\s?(.*)$/;
const ATTRIBUTION_LINE = /^[—–-]\s*(.*)$/;

// Parse a markdown body into the ordered content blocks the case page renders:
// `## Heading` starts a section, `![alt](url)` becomes a gallery image/video
// (video detected by extension), and `> …` lines become a quote block.
function parseBlocks(markdown: string): ContentBlock[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: ContentBlock[] = [];

  let section: { heading?: string; body: string[]; gallery: GalleryItem[] } | null = null;
  let quote: string[] | null = null;

  const flushSection = () => {
    if (!section) return;
    const body = section.body.join(" ").trim();
    if (section.heading || body || section.gallery.length) {
      blocks.push({
        type: "section",
        heading: section.heading,
        body: body || undefined,
        gallery: section.gallery,
      });
    }
    section = null;
  };

  const flushQuote = () => {
    if (!quote) return;
    let author: string | undefined;
    let role: string | undefined;
    const textLines: string[] = [];
    for (const line of quote) {
      const attribution = line.match(ATTRIBUTION_LINE);
      if (attribution) {
        const [authorPart, ...roleParts] = attribution[1].split(",");
        author = authorPart?.trim() || undefined;
        role = roleParts.join(",").trim() || undefined;
      } else {
        textLines.push(line);
      }
    }
    const text = textLines.join(" ").replace(/^["“”]|["“”]$/g, "").trim();
    if (text) blocks.push({ type: "quote", text, author, role });
    quote = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    const quoteMatch = line.match(QUOTE_LINE);
    if (quoteMatch) {
      flushSection();
      quote ??= [];
      if (quoteMatch[1].trim()) quote.push(quoteMatch[1].trim());
      continue;
    }
    flushQuote();

    if (!line) continue;

    const headingMatch = line.match(HEADING_LINE);
    if (headingMatch) {
      flushSection();
      section = { heading: headingMatch[1], body: [], gallery: [] };
      continue;
    }

    const imageMatch = line.match(IMAGE_LINE);
    if (imageMatch) {
      const [, alt, url] = imageMatch;
      section ??= { body: [], gallery: [] };
      section.gallery.push({
        type: isVideoUrl(url) ? "video" : "image",
        url,
        alt: alt || undefined,
      });
      continue;
    }

    // Plain text → section body.
    section ??= { body: [], gallery: [] };
    section.body.push(line);
  }

  flushSection();
  flushQuote();
  return blocks;
}

function parseCaseFile(fileName: string): CaseDetail {
  const slug = fileName.replace(/\.md$/i, "");
  const raw = fs.readFileSync(path.join(CASES_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const coverUrl = asString(data.cover) ?? asString(data.coverUrl);
  const coverType =
    (asString(data.coverType) as CoverMedia["coverType"]) ??
    (coverUrl && isVideoUrl(coverUrl) ? "video" : "image");
  const coverMedia: CoverMedia = { coverType, coverUrl };

  const aspect = asString(data.aspect);
  const metrics = toMetrics(data.metrics);
  const blocks = parseBlocks(content);

  return {
    id: slug,
    slug,
    title: asString(data.title) ?? slug,
    client: asString(data.client),
    aspect: aspect && ASPECTS.has(aspect) ? (aspect as CaseEntry["aspect"]) : "3-2",
    role: asString(data.role),
    featured: data.featured !== false,
    draft: data.draft === true,
    competencies: toCompetencies(data.competencies),
    coverMedia,
    intro: asString(data.intro),
    liveLink: asString(data.liveLink),
    liveLinkLabel: asString(data.liveLinkLabel),
    content: metrics.length ? [{ type: "metrics", metrics }, ...blocks] : blocks,
    order: typeof data.order === "number" ? data.order : 999,
  };
}

let cache: CaseDetail[] | null = null;

function loadCases(): CaseDetail[] {
  // Cache in production only; in dev, re-read each time so markdown edits show
  // up on refresh (Next doesn't watch these files as route dependencies).
  if (cache && process.env.NODE_ENV === "production") return cache;
  let fileNames: string[] = [];
  try {
    fileNames = fs
      .readdirSync(CASES_DIR)
      .filter(
        (name) =>
          name.toLowerCase().endsWith(".md") &&
          name.toLowerCase() !== "readme.md" &&
          !name.startsWith("_") &&
          !name.startsWith(".")
      );
  } catch {
    fileNames = [];
  }

  cache = fileNames
    .map(parseCaseFile)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title));
  return cache;
}

// Drafts are hidden from the homepage grid and related-cases lists, but still
// get a page (via getCaseSlugs) so they can be previewed by direct URL.
export function getCases(): CaseEntry[] {
  return loadCases().filter((entry) => entry.featured && !entry.draft);
}

export function getCaseSlugs(): string[] {
  return loadCases().map((entry) => entry.slug);
}

export function getCaseBySlug(slug: string): CaseDetail | null {
  const all = loadCases();
  const match = all.find((entry) => entry.slug === slug);
  if (!match) return null;

  const relatedCases = all.filter(
    (other) => other.featured && !other.draft && other.id !== match.id
  );
  return { ...match, relatedCases };
}
