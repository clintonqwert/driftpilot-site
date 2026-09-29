# Driftpilot release notes

Each release is tagged `vX.Y.Z` on `main` and published as a GitHub release. Milestones are listed under the release that shipped them, newest first.

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
