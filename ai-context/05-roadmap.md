# Driftpilot roadmap

## Already in place

`.github/workflows/ci.yml` runs lint, typecheck, unit tests, build, and Lighthouse CI (budgets in `lighthouserc.json`) on every pull request.

## First protect the revenue path

Done 2026-09-28 (PR #54). A failed delivery is reported to the visitor with a pre-filled email link and posted in full to Slack `#driftpilot-alerts`. `src/lib/crm.ts` has Riflessi's retry, backoff and timeout, with one 10-second deadline, and both submission paths have regression tests in CI. What remains is general error monitoring: `docs/maintenance/ROADMAP.md`, P0-3.

## Then increase discoverability and trust

1. Build location pages for the local SEO plan.
2. Replace temporary client imagery and add per-route Open Graph images where valuable.
3. Add a scoped Content-Security-Policy and automate the token mirror.

## Deferred intentionally

No CMS, global state library, or scheduling system without a concrete operating need.
