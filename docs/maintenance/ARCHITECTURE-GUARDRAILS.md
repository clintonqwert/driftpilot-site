# Architectural Guardrails

**Author:** Lead Architect review · 2026-07-08
**Purpose:** this codebase becomes the foundation for future client websites. These guardrails define what must not change, what should be hardened for reuse, and where improvement is safe.

---

## 1. Never rewrite (load-bearing, verified in production)

| Component / module | Why it must survive |
|---|---|
| **The content swap contract** (`src/lib/content/*` accessors + `src/types/content.ts`) | Every page fetches through async accessors against fixed types. This is what makes Phase-2 CMS, client-site cloning, and template extraction possible without touching pages. Breaking it forfeits the whole strategy. |
| **`src/lib/seo.ts`** (`buildMetadata` + JSON-LD builders) | Single canonical-URL and schema authority. Every route depends on it; schema output is validated. Extend with new builders; never fork per-page metadata logic. |
| **Lead pipeline** (`ContactForm`/`EarlyAccessForm` → `src/lib/actions/*` → `src/lib/crm.ts`) | Verified end-to-end in production. Honeypot + time-gate + value-echo behavior encodes hard-won review findings. Change the POST target (Phase 3), never the interface. |
| **`ScrollReveal` + `[data-reveal]` CSS** | Encodes four review cycles of edge cases: no-JS visibility, pre-hydration flash prevention, transition-hijack cleanup, reduced-motion exemption. Naive rewrites will regress at least one. |
| **`ShaderBackground` gating** | The idle-mount + WebGL probe + software-renderer rejection + static fallback stack exists because each layer fixed a measured failure (39s TBT on software GL). Recolor freely; do not simplify the gating. |
| **`next.config.ts` redirects + security headers** | `/how-we-work → /process` is a permanent contract with search engines. Append redirects; never remove one. |
| **Lighthouse CI gate** (`lighthouserc.json` + workflow step) | The enforcement mechanism that caught real bugs (software-GL shader, WCAG footer contrast, Calendly payload). Budgets may be re-baselined deliberately — never silently loosened to make a PR pass. |

## 2. Should become reusable (extract for the client-site foundation)

Priority order for extraction into the design system (see DESIGN-SYSTEM-ROADMAP.md):

1. **`buttonClasses` recipe** — already variant/size-complete with full interactive states; the pattern (class-recipe over component, for `<Link>` compatibility) should be the template for future recipes.
2. **Card surface** — adopt `ui/Card.tsx` across the 17 inline recipes or fold the recipe into a `cardClasses()`; either way, one source.
3. **`PageHero`, `CTABand`, `FAQSection`** — already prop-driven and reused across 10+ pages each; they are design-system components in all but packaging.
4. **`field.ts` form recipes + the form/action/validation triad** — the contact-form pattern (Zod schema, server action, spam gates, error echo) is the most valuable thing to give every client site.
5. **`CalendlyEmbed` facade** — the click-to-load pattern generalizes to *any* third-party embed (maps, video, chat) under a perf budget.
6. **`ScrollReveal` + marquee + `hero-glow`** — the motion language, as an optional layer.

## 3. Must remain stable (change only with explicit sign-off)

- **Design tokens** (`globals.css @theme` + `src/lib/design-tokens.ts`): components consume semantic names only; raw hex is confined to the two sanctioned consumers (og-image, shader). Re-theming a client site = swapping token values, nothing else. Guard the token *names*.
- **Navigation source of truth** (`src/lib/content/navigation.ts`): NavBar and SiteFooter render from it exclusively. The hardcoded-footer drift trap was closed in PR #22 — do not reopen it.
- **Automotive funnel isolation**: zero `/contact` links under `/automotive*`; CTAs route to early-access; informational service links allowed. Enforced by grep gate in review — keep enforcing.
- **Case-study curation contract**: array order is display order (documented in `case-studies.ts`). Any reordering is a deliberate curation act.
- **URL structure** (`/services/[slug]`, `/work/[slug]`, `/insights/[slug]`, `/insights/tag/[tag]`): indexed, canonicalized, sitemap-registered. Renames require redirects and sign-off.
- **Published business facts** (48h scope doc, 50/50 terms, 2–4 weeks, Lighthouse 95+ gate, ownership promise): copy in code must stay consistent with these everywhere; they appear in FAQs, process steps, schema, and CTAs.

## 4. Safe to improve (low-risk surfaces)

- Section-level page composition (adding/removing/reordering sections on any route).
- Copy within the published-facts constraints; article content; case-study curation.
- Visual polish inside tokens (spacing, radii usage, motion timing).
- The insights hub (search, reading time, categories) — additive.
- `lighthouserc.json` URL coverage, CI steps, tooling (Prettier, tests, Renovate).
- Anything under `docs/`.

## 5. Guardrail rules (the short list for every future PR)

1. Pages fetch through accessors; components never fetch. New content = new module + accessor, same shapes.
2. Semantic tokens only in components; raw hex only in `design-tokens.ts` consumers.
3. No new client component without checking the 260 kB script budget; third-party embeds use the facade pattern.
4. Every route gets `buildMetadata` + appropriate JSON-LD from `seo.ts` builders; new schema types are added as builders.
5. Never remove a redirect; never bypass the Lighthouse gate; never link `/contact` from automotive surfaces.
6. Copy claims must trace to a published fact or get explicit owner sign-off (the "no invention" rule).
7. One PR per task; Reviewer findings are propose-before-apply; the user merges.
