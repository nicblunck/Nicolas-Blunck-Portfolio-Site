export function slugify(input?: string): string {
  if (!input) return "";
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
