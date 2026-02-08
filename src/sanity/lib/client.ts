import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanityConfig, projectId } from "../env";

type SanityClient = ReturnType<typeof createClient>;

export function getClient(useDraft = false): SanityClient | null {
  if (!hasSanityConfig) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !useDraft,
    token: useDraft ? process.env.SANITY_API_READ_TOKEN : undefined,
    perspective: useDraft ? "previewDrafts" : "published",
  });
}

export const client = getClient(false);
