import type { ContactLink } from "@/components/ContactSection";

export type CompetencyEntry = {
  key: string;
  label: string;
  emoji?: string;
  bg?: string;
};

export type CoverMedia = {
  coverType?: "image" | "video" | "link";
  coverUrl?: string;
};

export type CaseEntry = {
  id: string;
  title: string;
  client?: string;
  slug: string;
  aspect?: "9-16" | "3-4" | "1-1" | "3-2";
  role?: string;
  featured?: boolean;
  draft?: boolean;
  competencies?: CompetencyEntry[];
  coverMedia?: CoverMedia;
};

export type MetricEntry = {
  value?: string;
  label?: string;
};

export type GalleryItem = {
  type: "image" | "video";
  url: string;
  alt?: string;
};

export type MetricsBlock = {
  type: "metrics";
  metrics: MetricEntry[];
};

export type SectionBlock = {
  type: "section";
  heading?: string;
  body?: string;
  gallery?: GalleryItem[];
};

export type QuoteBlock = {
  type: "quote";
  text?: string;
  author?: string;
  role?: string;
};

export type ContentBlock = MetricsBlock | SectionBlock | QuoteBlock;

export type CaseDetail = CaseEntry & {
  intro?: string;
  liveLink?: string;
  liveLinkLabel?: string;
  content?: ContentBlock[];
  relatedCases?: CaseEntry[];
  order?: number;
};

export type ContactLinkEntry = ContactLink & {
  id: string;
};

export type ClientLogoEntry = {
  id: string;
  name: string;
  logoUrl: string;
  logoMimeType?: string | null;
};
