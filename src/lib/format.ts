/** Shared formatting helpers. */

/** Date-only ISO strings render as written — pin UTC to avoid off-by-one west of UTC. */
export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
