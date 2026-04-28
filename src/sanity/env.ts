export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-08";

const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const hasSanityEnv = Boolean(rawDataset && rawProjectId);

if (!hasSanityEnv) {
  const message =
    "[sanity] Missing NEXT_PUBLIC_SANITY_DATASET or NEXT_PUBLIC_SANITY_PROJECT_ID.";
  if (process.env.NODE_ENV === "production") {
    throw new Error(`${message} Refusing to build without a real Sanity project.`);
  }
  console.warn(`${message} Using fallback values so dev builds can continue.`);
}

export const dataset = rawDataset ?? "production";
export const projectId = rawProjectId ?? "placeholder";
