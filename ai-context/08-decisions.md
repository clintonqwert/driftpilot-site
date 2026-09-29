# Driftpilot decision log

## 2026-07-30 — Establish AI context baseline

**Decision:** Add a fact-based `ai-context/` layer derived from the current repository and `docs/project-analysis.md`.

**Reason:** Give Claude Code and reviewers a concise, current source of project intent without treating AI-generated assumptions as code truth.

**Consequence:** Significant future product or architecture changes must update the relevant context file.

## 2026-09-27 — A failed lead delivery is reported, never confirmed

**Decision:** Port Riflessi's lead-delivery handling. `deliverLead()` returns `false` when a lead is unaccounted for, and the action returns a form error with a pre-filled email link instead of redirecting to `/thank-you`. `crm.ts` takes Riflessi's client: 3 attempts, 400 ms doubling backoff, an 8 s timeout, and retries only for 5xx, 429 and network failures.

**Reason:** A failed delivery used to show the thank-you page, and the lead was gone without anyone knowing.

**Consequence:**
- On failure the full lead is also written to the server log. That log is not a recovery record: Vercel keeps runtime logs for 1 hour on Hobby and 1 day on Pro, and nothing alerts anyone to read it. The Slack alert below is the record.
- The time-to-submit gate still lets a *missing* stamp through, on purpose: these forms are progressively enhanced and post without JavaScript, where the stamp is never set. Riflessi treats a missing stamp as spam only because its form has no no-JS path.

## 2026-09-28 — A failed lead is sent to Slack in full

**Decision:** When `deliverLead()` returns `false`, it also posts the whole lead to `#driftpilot-alerts` through a Slack incoming webhook (`SLACK_ALERT_WEBHOOK_URL`). The owner chose the full lead over a notice without personal data.

**Reason:** The server log expires in 1 hour on Vercel Hobby and 1 day on Pro, and nobody is told to read it. A Slack message both alerts someone and keeps the details needed to reply to the lead. An incoming webhook was chosen over Vercel Connect because it needs no package, no bot and no channel ID, and the URL can post to that one channel only.

**Consequence:**
- Lead details (name, email, message, budget) are stored in the Driftpilot Slack workspace. The privacy page allows passing a lead to internal tools used to deliver the service; revisit that wording if Slack's role grows.
- The alert is best effort: one attempt, a 5 s timeout, sent with `after()` so the visitor never waits on it. If Slack is down at the same moment as the CRM, only the log line remains.
- Visitor text is escaped before it reaches Slack, so input such as `<!channel>` shows as typed instead of pinging the channel.
- `crm.ts` sends `Accept: application/json` and no longer follows redirects. Formspree, the live webhook, redirects to an HTML page when it isn't asked for JSON, and following that could turn a rejected lead into a 200. A redirect is now a failure that isn't retried.
- `crm.ts` gives the whole call one 10 s deadline (`DELIVERY_DEADLINE_MS`). With only the 8 s per-attempt timeout, a hung webhook kept the visitor on "Sending…" for about 25 s before the error and email link appeared, and a visitor who closes the tab never sees the fallback. Now each attempt's timeout is cut to the time left, and no retry starts without time to run. A hung webhook gets 2 attempts instead of 3.

## 2026-09-28 — Releases are tagged on `main`

**Decision:** Cut numbered releases. Each release is a `vX.Y.Z` tag on the `main` merge commit, with a GitHub release whose notes come from `11-release-notes.md`. `package.json` carries the latest release's version. The first is v1.1.0. v1.0.0 is tagged afterwards on the merge of #49, where the README first recorded v1.0, so v1.1.0 has a baseline to compare against.

**Reason:** Nothing had been tagged, and `package.json` still said `0.1.0` after the v1.0 launch (`docs/maintenance/ROADMAP.md`, "Version hygiene"). A tag gives each production state a name to point to in a rollback, a bug report or a client conversation.

**Consequence:**
- Versioning follows SemVer as it applies to a website: a patch for fixes, copy and docs; a minor for new capability, such as v1.1.0's lead alerting; a major for a phase change (Phase 2 CMS, Phase 3 lead pipeline).
- The version bump and its release notes go through a normal PR. The tag and the GitHub release are created only after the owner merges it.
