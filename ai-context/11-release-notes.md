# Driftpilot release notes

Each release is tagged `vX.Y.Z` on `main` and published as a GitHub release. Milestones are listed under the release that shipped them, newest first.

## v1.1.1 — 2026-10-06

A security patch: Next.js 16.3.8 fixes 12 advisories, including a denial of service through the Server Actions behind both lead forms. This release also carries the DP logo and favicon set, and a privacy policy that says where a failed lead goes.

### 2026-10-06 — Next.js security patch (#59)

- Next.js 16.2.7 → 16.3.8, which fixes 12 advisories, including a denial of service through the Server Actions behind both lead forms. See `08-decisions.md`.
- `npm audit --omit=dev` is clean.
- No change to content, routes, CTAs, headers or lead delivery.

### 2026-09-30 — Brand logo and favicon (#58)

- The nav, mobile drawer and footer show the DP lockup instead of the text "Driftpilot". It is an inline SVG traced from the brand sheet, so it is sharp at any size and needs no extra request.
- New favicon set from the brand sheet's DP mark: `icon.svg`, a 16/32/48 `favicon.ico` (2.4 KB, down from the 26 KB Next.js default) and a 180px `apple-icon.png`.
- The social share card shows the lockup in place of the green uppercase wordmark.
- The Organization JSON-LD on `/` and `/about` gains a `logo`.
- The open mobile drawer now covers the sticky header instead of sitting under it.
- No change to content, routes, CTAs or lead delivery.

### 2026-09-29 — Privacy policy names the failed-lead path (#57)

- The privacy policy now says that a submission the CRM tool can't accept is posted to a private Slack channel so it can still be answered, and that Vercel keeps it briefly in server logs. "Last updated" moves to September 2026.
- No change to how leads are handled.

## v1.1.0 — 2026-09-28

A lead that fails to deliver is now reported and alerted instead of lost, and the lead pipeline has its first tests. The owner confirmed live lead delivery by email on 2026-09-28. This release also carries the AI context baseline and the two-machine development setup.

### 2026-09-27 — Leads are never confirmed unless they arrive (#54)

- The contact and early-access forms now tell the visitor when delivery fails, with an email link carrying their answers, instead of showing the thank-you page. This works with and without JavaScript.
- Every answer, including the contact form's budget, stays filled in after a failed send or a validation error, so pressing Send again works. Before, the budget went back to "Select a range…" whenever JavaScript was on.
- A lead that fails to deliver is posted in full to Slack `#driftpilot-alerts` (`SLACK_ALERT_WEBHOOK_URL`), after the visitor's response, so someone knows and can reply.
- The CRM client makes up to 3 attempts with a 400 ms doubling backoff and an 8 s timeout per attempt, all within a 10 s deadline, so a hung webhook can't keep the visitor waiting longer than that. It no longer retries a 4xx. It asks the webhook for JSON and treats a redirect as a failure, so a rejected Formspree submission can't pass as delivered.
- The first test runner: Vitest, 48 tests over the lead pipeline, run in CI.
- No change to routes, content, the success path, or funnel isolation.

### 2026-07-30 — Development setup and deployment docs (#51–#53)

- `.nvmrc` pins Node 22 for CI and both development machines, and `.gitattributes` keeps line endings identical between the Windows and macOS checkouts.
- The deployment docs name the environment variables the code actually reads.
- The lead-delivery work was scoped in `06-backlog.md` so it could be picked up cold. It shipped as #54, above.
- No product behavior changed.

### 2026-07-30 — AI context baseline (#50)

- Added a concise project charter, architecture, roadmap, standards, and supporting context for AI-assisted work.
- Replaced the `CLAUDE.md` pointer with a real entrypoint: working rules, the `ai-context/` reading order, and the binding role contract for `.claude/skills/`.
- No product behavior, public content, configuration, or dependency changed.

## v1.0.0 — 2026-07-08

The site went live on driftpilot.ca: the full site on a typed content layer, contact and early-access forms delivering to the CRM, the SEO foundation, and a Lighthouse CI performance budget enforced on every pull request. Lead delivery was verified end to end in production on 2026-07-08.

Tagged afterwards, at the merge of #49, where the README first recorded v1.0.
