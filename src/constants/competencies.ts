import type { CompetencyEntry } from "@/sanity/types";

export const fallbackCompetencies: CompetencyEntry[] = [
  { _id: "fallback-art", key: "art-direction", label: "Art Direction", emoji: "🎨", bg: "#dfe8c2" },
  { _id: "fallback-ui", key: "ui", label: "UI", emoji: "📱", bg: "#ffd6c9" },
  { _id: "fallback-ux", key: "ux", label: "UX", emoji: "🧭", bg: "#cfe9ff" },
  { _id: "fallback-motion", key: "motion", label: "Motion", emoji: "🏃‍♂️", bg: "#ffd0d6" },
  { _id: "fallback-illustration", key: "illustration", label: "Illustration", emoji: "🖌️", bg: "#ffd9b8" },
  { _id: "fallback-branding", key: "branding", label: "Branding", emoji: "🪧", bg: "#fff6b8" },
];

export type WorkCardTag = {
  key: string;
  label: string;
  emoji: string;
  bgColor: string;
};

export const defaultWorkCardTags: WorkCardTag[] = [
  { key: "art-direction", label: "Art Direction", emoji: "🎨", bgColor: "#d8e2b8" },
  { key: "ui", label: "UI", emoji: "📱", bgColor: "#ffd4c7" },
  { key: "ux", label: "UX", emoji: "🧭", bgColor: "#cbebff" },
  { key: "motion", label: "Motion", emoji: "🏃", bgColor: "#fdcfcf" },
  { key: "illustration", label: "Illustration", emoji: "🖌", bgColor: "#fedab8" },
  { key: "branding", label: "Branding", emoji: "🪧", bgColor: "#fdf9c1" },
];
