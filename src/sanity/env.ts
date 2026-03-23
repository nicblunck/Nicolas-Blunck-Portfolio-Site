export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-08";

const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const hasSanityEnv = Boolean(rawDataset && rawProjectId);

if (!hasSanityEnv) {
  console.warn(
    "[sanity] Missing NEXT_PUBLIC_SANITY_DATASET or NEXT_PUBLIC_SANITY_PROJECT_ID. " +
      "Using fallback values so build can continue."
  );
}

// Use safe fallbacks so server builds do not fail at import time.
// Runtime Sanity fetches are already guarded with catch blocks in pages.
export const dataset = rawDataset ?? "production";
export const projectId = rawProjectId ?? "placeholder";
