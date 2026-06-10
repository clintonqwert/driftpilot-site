/**
 * WP shape → app types — Phase 2 (handoff doc §12.3). The whole point of
 * this layer: components keep receiving types/content.ts shapes and never
 * see WordPress's.
 *
 * When Phase 2 lands, implement here with the SAME signatures as
 * lib/content/case-studies.ts and lib/content/articles.ts, then flip the
 * accessor imports in pages:
 *
 *   export async function getAllCaseStudies(): Promise<CaseStudy[]> {
 *     const data = await cmsFetch(CASE_STUDIES_QUERY, { tags: ["case-studies"] });
 *     return data.caseStudies.nodes.map(mapWpCaseStudy);
 *   }
 *
 * Build resilience: if WPGraphQL is unreachable at build time, fall back to
 * last-known-good cached JSON and log loudly — the marketing site must never
 * fail to deploy because the CMS is down.
 */

export {};
