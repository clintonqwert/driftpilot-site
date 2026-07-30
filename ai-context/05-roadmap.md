# Driftpilot roadmap

## Already in place

`.github/workflows/ci.yml` runs lint, typecheck, build, and Lighthouse CI (budgets in `lighthouserc.json`) on every pull request.

## First protect the revenue path

**This is the highest-priority work in the repository. Details in `06-backlog.md`.**

1. Stop confirming leads that were never delivered — both actions redirect to `/thank-you` regardless of the outcome.
2. Harden `src/lib/crm.ts` by backporting Riflessi's implementation.
3. Give a failed delivery somewhere durable to land.
4. Add regression tests for both submission paths; the repository has no test runner yet.

## Then increase discoverability and trust

1. Build location pages for the local SEO plan.
2. Replace temporary client imagery and add per-route Open Graph images where valuable.
3. Add a scoped Content-Security-Policy and automate the token mirror.

## Deferred intentionally

No CMS, global state library, or scheduling system without a concrete operating need.
