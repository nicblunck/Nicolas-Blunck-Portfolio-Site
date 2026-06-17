import type { CompetencyEntry } from "@/lib/types";

export const competencies: CompetencyEntry[] = [
  { key: "art-direction", label: "Art Direction", emoji: "🎨", bg: "#dfe8c2" },
  { key: "ui", label: "UI", emoji: "📱", bg: "#ffd6c9" },
  { key: "ux", label: "UX", emoji: "🧭", bg: "#cfe9ff" },
  { key: "motion", label: "Motion", emoji: "🏃‍♂️", bg: "#ffd0d6" },
  { key: "illustration", label: "Illustration", emoji: "🖌️", bg: "#ffd9b8" },
  { key: "branding", label: "Branding", emoji: "🪧", bg: "#fff6b8" },
];

export function competencyByKey(key: string): CompetencyEntry | undefined {
  const normalized = key.trim().toLowerCase();
  return competencies.find((entry) => entry.key === normalized);
}

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
