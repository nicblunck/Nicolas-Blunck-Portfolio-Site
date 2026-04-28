import type { ContactLink } from "@/components/ContactSection";

export type CompetencyEntry = {
  _id: string;
  key?: string;
  label?: string;
  emoji?: string;
  bg?: string;
};

export type CoverMedia = {
  coverType?: "image" | "video" | "link";
  image?: unknown;
  videoUrl?: string;
  link?: string;
};

export type CaseEntry = {
  _id: string;
  title: string;
  client?: string;
  slug?: { current?: string };
  slugValue?: string;
  aspect?: "9-16" | "3-4" | "1-1" | "3-2";
  role?: string;
  competencies?: CompetencyEntry[];
  coverMedia?: CoverMedia;
};

export type CaseMedia = {
  _id: string;
  mediaType?: "image" | "video";
  alt?: string;
  image?: unknown;
  video?: { asset?: { url?: string } };
};

export type MetricEntry = {
  value?: string;
  label?: string;
};

export type MetricsBlock = {
  _type: "caseMetrics";
  metrics?: MetricEntry[];
};

export type SectionBlock = {
  _type: "caseSection";
  heading?: string;
  body?: string;
  gallery?: Array<CaseMedia | null>;
};

export type QuoteBlock = {
  _type: "caseQuote";
  text?: string;
  author?: string;
  role?: string;
};

export type ContentBlock = MetricsBlock | SectionBlock | QuoteBlock;

export type ContactLinkEntry = ContactLink & {
  _id: string;
};

export type ClientLogoEntry = {
  _id: string;
  name: string;
  logo?: {
    asset?: {
      url?: string;
      mimeType?: string | null;
    };
  };
};
