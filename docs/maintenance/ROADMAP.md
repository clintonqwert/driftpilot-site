# Driftpilot v1.0 — Maintenance Roadmap

**Status:** v1.0 feature complete · transitioning to maintenance mode
**Author:** CTO review · 2026-07-08
**Scope:** full codebase review at `f59dc8f` (post PR #23)

---

## 1. Current project health

**Overall: healthy.** The site is fully static (37 prerendered routes), ships zero unnecessary client JS, and passes an enforced Lighthouse CI gate (perf ≥ 95, a11y ≥ 98, SEO ≥ 95, LCP < 1.5s, TBT < 150ms, 260 kB script budget) on every PR. The lead pipeline is verified end-to-end in production (form → server action → webhook → inbox, confirmed 2026-07-08). Content lives in typed modules behind async accessors (the Phase-2 CMS swap contract), navigation renders from a single source of truth, and JSON-LD is emitted from shared builders on every major surface.

| Signal | State |
|---|---|
| Build / lint / typecheck | Green, enforced in CI |
| Lighthouse CI gate | Green, 3 URLs (/, /pricing, /contact) |
| Lead pipeline | Verified in production |
| Automated tests | **None — 0 test files** |
| Error monitoring | **None** |
| Dependency currency | Current minus two patch releases (next 16.2.7 → .10, react 19.2.4 → .7) |
| Version hygiene | `package.json` still `0.1.0`; `engines` allows EOL Node 18 while Vercel runs 24 |

The two bolded gaps define maintenance-mode risk: the only revenue path (lead capture) has no regression tests and no failure alerting.

## 2. Technical debt

1. **`src/components/ui/Card.tsx` is dead code** — zero imports, while ~17 call sites hand-roll the identical `rounded-lg border border-line bg-raised p-6 md:p-8` recipe. Adopt it or delete it; today it misleads.
2. **Scheduler card duplication** (deferred P2-3 from PR #22): `CalendlyEmbed` facade card and `CalendlySection` placeholder card are near-identical.
3. **Related-link labels restate owned data** (deferred P2-7 from PR #20): `articles.ts` `related` labels hardcode case-study stats; a stat revision leaves stale claims in link text. Fix lands naturally with the Phase-2 CMS adapter (reference by slug).
4. **No formatter**: no Prettier, no format check — the pages-polish PR shipped a 28-line indentation regression that lint could not catch. Recommended twice in review.
5. **`services.ts` deliverable says "Analytics setup (Plausible or GA4)"** while the sanctioned house stack is Vercel Analytics + Speed Insights. It describes a *client* deliverable, so it may be intentional — but it reads as drift and should be a deliberate decision.
6. **Home `ProcessSection` narrates 3 phases; `/process` teaches 6 steps.** Both derive from the same published ranges, but the mismatch will eventually confuse a careful prospect. Align the homepage summary with the six-step vocabulary.
7. **Stale metadata**: `version: 0.1.0` (this is v1.0), `engines.node >=18.17` (18 is EOL; production runs 24).
8. **`crm.ts` TODO** — see Bugs; it is debt *and* a bug.

## 3. Bugs (known, live)

1. **Silent lead loss on webhook failure** (`src/lib/crm.ts:35`). Two delivery attempts, then the lead survives only as a `console.error` in function logs while the visitor still sees /thank-you. The TODO ("queue fallback email on total failure — never lose a lead") has been open since Phase 1. For a lead-generation business this is the single most important open item. Compounding factor: the Formspree free tier caps at 50 submissions/month with no in-repo visibility when the cap is hit.
2. **Calendly cookie banner renders inside the embed** despite `hide_gdpr_banner=1` — account-side Calendly setting, not code; documented here so nobody hunts for a code bug.
3. No other functional bugs known. (Historical bugs — danger-token classes, tag-URL encoding, UTC date shift, footer contrast — were found and fixed during review cycles.)

## 4. Performance opportunities

- **Per-route Lighthouse coverage**: the CI gate tests 3 URLs; `/process` (heaviest new page) and `/automotive` are unguarded. Adding 2 URLs costs ~90s of CI.
- **Font subsetting**: Inter loads with the `opsz` axis sitewide; a `text` subset audit could trim the woff2 payload.
- **Script budget headroom** is 237/260 kB — fine, but any new client component eats the margin; treat 260 as a hard ceiling in review.
- **Image discipline**: the site currently ships zero content images. The moment marketing adds them (blog expansion, case-study screenshots), enforce `next/image` + AVIF from day one.

## 5. Accessibility improvements

- The a11y ≥ 98 gate covers 3 URLs; extend with `/process` (timeline semantics) and one article page.
- Focus-visible and reduced-motion discipline is good (validated in review); keep the click-to-load facade pattern for any future third-party embed.
- `FAQSection` `<details>` pattern: first item defaults open — verify screen-reader announcement order once real user feedback exists.
- Add automated axe checks to the future test suite rather than expanding manual passes.

## 6. SEO improvements

- **Per-route OG images** — the single biggest visible gap. One global OG image serves all 37 routes; services, work, insights, and process deserve per-route images (`next/og` is already in use for the global one).
- `dateModified` on articles (currently only `datePublished`) once content editing begins.
- Organization schema is emitted on `/` and `/about` only — correct, but revisit when testimonials/reviews exist (AggregateRating potential, real clients only).
- Local SEO pages and industry landing pages (marketing backlog) are the growth lever; the taxonomy module makes them cheap to wire.

## 7. UX improvements

- **Insights search/filter** once the library passes ~10 posts (explicitly deferred at 3 posts).
- Article pages have no reading-time or progress affordance — cheap wins for content marketing credibility.
- `/thank-you` is generic for both funnels; a dealer-specific thank-you (matching funnel isolation) would let automotive conversions set correct expectations.
- Careers page is minimal ("no open roles") — fine, but link it from About's vision section or refresh it before any hiring push.
- Tablet (768–1023px) hamburger drawer was a deliberate trade-off; monitor analytics for tablet share and revisit if it exceeds ~10%.

## 8. Developer experience improvements

- **Automated tests: none.** Priority order: (1) server-action unit tests for both forms (validation, honeypot, time-gate, webhook failure path), (2) content-module invariant tests (slug uniqueness, taxonomy completeness, curation-order contract), (3) a Playwright smoke for the booking + lead flows. The review cycles caught real bugs every single PR — tests would catch the same class earlier and cheaper.
- **Prettier + CI format check** (see debt #4).
- **Error monitoring**: Vercel runtime logs exist but nobody is alerted. Sentry (or Vercel log drains + alerting) closes the loop the crm.ts bug needs.
- **Dependency cadence**: monthly `npm outdated` + patch-bump PR; Renovate/Dependabot would automate it.
- Role-based agent workflow (Builder/Reviewer/Tester) is documented in repo skills and works well — keep it.

---

## 9. Prioritized maintenance backlog

**P0 — Critical (do first, v1.1)**

| # | Item | Why |
|---|---|---|
| P0-1 | Lead-delivery fallback: durable capture on webhook failure (retry queue or fallback email) + alert | Silent lead loss on the revenue path |
| P0-2 | Server-action test suite (both forms: happy path, validation, spam gates, webhook-failure behavior) | Zero regression protection on the only conversion flow |
| P0-3 | Error monitoring with alerting (Sentry or Vercel alerts) wired to form/webhook failures | Failures are currently invisible |

**P1 — High (v1.1)**

| # | Item |
|---|---|
| P1-1 | Adopt-or-delete `ui/Card.tsx`; migrate the 17 inline card recipes if adopting |
| P1-2 | Per-route OG images (services, work, insights, process, about, contact) |
| P1-3 | Prettier + `--check` in CI |
| P1-4 | Version/engines hygiene: `1.0.0`, `engines >=20`, patch-bump next/react; establish monthly dependency cadence (Renovate) |
| P1-5 | Extend Lighthouse CI to `/process` + `/automotive` |
| P1-6 | Formspree plan review (50/mo cap) or move lead delivery to a paid/owned channel |
| P1-7 | Free Website Audit landing page (business backlog — highest-intent lead magnet) |

**P2 — Medium (v1.2)**

| # | Item |
|---|---|
| P2-1 | Align home ProcessSection copy with the six-step vocabulary |
| P2-2 | SchedulerCard extraction (Calendly facade/placeholder dedup) |
| P2-3 | Content-module invariant tests + Playwright smoke (booking + lead flows) |
| P2-4 | Insights search/filter (trigger: ≥10 posts) + reading time |
| P2-5 | Newsletter capture + email automation (business backlog) |
| P2-6 | Blog expansion: 6–10 posts across the three topics; industry landing pages |
| P2-7 | Funnel-specific thank-you for automotive |
| P2-8 | Resolve services.ts analytics-deliverable wording |
| P2-9 | `dateModified` support on articles |

**P3 — Nice to have (Future)**

| # | Item |
|---|---|
| P3-1 | Related-link labels derived from slugs (with Phase-2 CMS adapter) |
| P3-2 | Testimonials/success stories module (real clients only — blocked on client permission) |
| P3-3 | Live chat, referral program, downloadable guides, video content |
| P3-4 | CRM upgrade path (HubSpot/Pipedrive native) + analytics dashboard |
| P3-5 | Headless WordPress Phase 2 (the swap contract is ready; pull the trigger when content volume justifies it) |
| P3-6 | Cloudflare layer, CI/CD enhancements beyond current gates |
| P3-7 | Vertical templates: contractor, restaurant, medical, automotive; Driftpilot Drive platform |

Milestone mapping, acceptance criteria, and effort estimates live in the GitHub issues (see milestones **Driftpilot v1.1**, **Driftpilot v1.2**, **Future**).
