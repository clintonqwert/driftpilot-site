# Driftpilot roadmap

## Already in place

`.github/workflows/ci.yml` runs lint, typecheck, build, and Lighthouse CI (budgets in `lighthouserc.json`) on every pull request.

## First protect the revenue path

1. Add regression tests for the contact and early-access submission paths; the repository has no test runner yet.
2. Harden CRM delivery in `src/lib/crm.ts`: it retries twice with no backoff, no request timeout, and replays non-retryable 4xx responses. Riflessi's `src/lib/crm.ts` already solves all three — backport it.
3. Implement the `TODO(phase 1)` fallback in `src/lib/crm.ts` so a failed delivery cannot silently lose a lead.

## Then increase discoverability and trust

1. Build location pages for the local SEO plan.
2. Replace temporary client imagery and add per-route Open Graph images where valuable.
3. Add a scoped Content-Security-Policy and automate the token mirror.

## Deferred intentionally

No CMS, global state library, or scheduling system without a concrete operating need.
