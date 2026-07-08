# Driftpilot Design System — Component Roadmap

**Author:** Design-system review · 2026-07-08
**Goal:** identify which of the 25 existing components graduate into a reusable Driftpilot Design System (DDS) that powers future client sites and vertical templates (contractor, restaurant, medical, automotive).

The token layer already supports this: components consume semantic tokens (`surface/raised/fg/muted/accent/line`), so a client re-theme is a token-value swap. The gap is packaging and per-component API hardening.

---

## Tier 1 — Design-system ready (extract as-is, v1.1)

Prop-driven, token-pure, reused on 4+ pages, review-hardened.

| DDS component | Source | Notes for extraction |
|---|---|---|
| **Button** | `ui/button.ts` (`buttonClasses`) | 4 variants × 3 sizes, full interactive states. The recipe-over-component pattern is the DDS standard. |
| **CTA Section** | `shared/CTABand.tsx` | Prop-driven headline/subhead/two CTAs; accent-band identity. Used on 10+ pages. |
| **Hero (interior)** | `shared/PageHero.tsx` | Eyebrow/heading/subheading + glow treatment. |
| **FAQ** | `shared/FAQSection.tsx` | Native `<details>` accordion + automatic FAQPage JSON-LD — schema built in is a differentiator. |
| **Form fields** | `ui/field.ts` + form/action/validation triad | The most valuable client-site asset: Zod schema + server action + spam gates + error echo. Ship as a pattern, not just styles. |
| **Contact Form** | `forms/ContactForm.tsx` | Reference implementation of the triad. |
| **Embed facade** | `shared/CalendlyEmbed.tsx` | Generalize to `EmbedFacade` (calendar/map/video/chat) — click-to-load under a perf budget. |
| **JSON-LD renderer** | `shared/JsonLd.tsx` + `seo.ts` builders | DDS ships with schema as a first-class feature. |

## Tier 2 — Reusable after API hardening (v1.1–v1.2)

Reused today but carry local data or single-purpose assumptions.

| DDS component | Source | Hardening needed |
|---|---|---|
| **Card** | `ui/Card.tsx` | Currently dead code; adopt across the 17 inline recipes (P1-1) or convert to `cardClasses()`. Decide before extraction. |
| **Pricing Card** | `pricing/page.tsx` `PlanCard` | Move out of the page file; it already renders from `pricing.ts` data with badges/links/CTA — nearly ready. |
| **Feature Section** | `home/ServicesGrid.tsx` pattern | Generalize "icon + title + outcome + link" grid; icons stay presentation-side (`Record<slug, icon>` pattern is correct). |
| **Stat/Proof strip** | `home/SocialProofBar.tsx` (marquee) + stat cards on About | Two presentations of one concept — unify data shape (`{figure, label}`), keep marquee vs grid as variants. |
| **Article Card** | `shared/ArticleCard.tsx` | Ready, but couple with `formatArticleDate` and tag-chip pattern as one unit. |
| **Timeline** | `process/page.tsx` six-step `<ol>` | Extract `Timeline` + `TimelineStep`; valid-HTML rail pattern is review-hardened. |
| **Tech/Tag Pill** | `shared/TechPill.tsx` + tag chips | Merge into one `Pill` with a color-map prop. |
| **Case-study surfaces** | featured card (work), grid card, proof strip (automotive) | Three hand-rolled presentations of `CaseStudy` — unify as `CaseStudyCard` with `variant`. |

## Tier 3 — Site-specific (do NOT extract)

| Component | Why it stays |
|---|---|
| `home/HeroSection.tsx` + `ShaderBackground` | The shader hero is Driftpilot's signature, not a template primitive. Templates get `PageHero` + optional `hero-glow`. |
| `shared/AutomotiveBanner.tsx`, automotive page sections | Funnel-specific. |
| `layout/NavBar.tsx`, `layout/SiteFooter.tsx` | Extract the *pattern* (nav from `navigation.ts` maps) but each client ships its own chrome. |
| `home/WhySection`, `home/ProcessSection`, `home/PortfolioSection` | Brand-voice compositions of Tier-1/2 primitives. |
| `shared/ScrollReveal.tsx` | Ships with DDS as the optional motion layer, but as infrastructure, not a component. |

## Missing components the backlog will need (build DDS-first)

- **Testimonial / quote card** (real clients only) — needed by business backlog; design the shape now (`{quote, name, role, company}`), populate later.
- **Newsletter capture** — inline single-field variant of the form triad.
- **Lead-magnet / download card** — for guides + audit funnel.
- **Comparison table** — pricing tiers and vs-vendor pages (automotive).
- **Logo strip** — client logos when permission exists.

## Packaging roadmap

1. **v1.1 — in-repo consolidation**: everything Tier 1 + Card decision under `src/components/ui/` with consistent prop APIs; document each with a usage comment. No new package yet.
2. **v1.2 — template extraction dry-run**: build the Free Website Audit landing page exclusively from DDS components; any gap or awkward API found is a DDS bug — fix upstream.
3. **Future — `@driftpilot/ui` package**: extract tokens + Tier 1/2 into a private package the moment the second site (first vertical template) starts. Not before — premature packaging is overhead with one consumer.

**Definition of done for any DDS component:** token-pure, prop-driven (no imports from `lib/content`), all five interactive states where interactive, a11y reviewed, and used in at least two places.
