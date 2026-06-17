import type { ContactLinkEntry } from "@/lib/types";

export const contactLinks: ContactLinkEntry[] = [
  { id: "email", label: "Email", url: "mailto:nicolasblunck@me.com", emoji: "✉️" },
  { id: "instagram", label: "Instagram", url: "https://instagram.com/earthlingandco", emoji: "📸" },
  {
    id: "bluesky",
    label: "Bluesky",
    url: "https://bsky.app/profile/nicolasblunck.com",
    emoji: "🦋",
  },
];
