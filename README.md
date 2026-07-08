# Driftpilot

**An AI-native web development studio for small businesses, contractors, and growth-stage companies — with a dedicated automotive dealership practice.**

This repository contains the production site for [driftpilot.ca](https://driftpilot.ca) — built with Next.js 16, TypeScript, and Tailwind CSS v4, deployed on Vercel. The site is also the portfolio piece: it ships with the same performance budget we hold client work to, enforced by Lighthouse CI on every pull request (performance ≥ 95, LCP under 1.5s).

**Status:** v1.0 — feature complete, live in production, transitioning to maintenance mode.

---

## Overview

Driftpilot delivers production-ready Next.js and headless WordPress sites in weeks, not months, with lead generation built in from day one. The client base spans industries — the case studies on the site cover home services, SaaS, professional services, and automotive retail:

- **Small and growth-stage businesses** — contractors and home services, professional services like law firms and clinics, and SaaS companies — that need a high-performance digital presence without a large agency retainer.
- **Automotive dealerships**, the studio's specialized vertical — dealers paying $1,500+/month for template websites they don't own, with leads going into a vendor's black box.

Web development and lead generation are treated as one engagement, not two. Every site ships with conversion paths, CRM integration, structured data, and analytics wired in — because a fast site that doesn't capture leads is just an expensive brochure.

This codebase demonstrates that approach in practice: a fully static, type-safe marketing site with a content layer designed to swap to a headless CMS without touching a single page or component.

## Features

**Site**

- Marketing site across services, case studies (`/work`), insights (blog with tags), pricing, careers, a six-step client-journey page (`/process`), and a dedicated automotive landing page — 37 pages prerendered at build time
- Contact and early-access forms backed by React Server Actions, validated with Zod, delivered to CRM webhooks with retry logic; honeypot + time-to-submit spam checks that never reveal detection
- Discovery-call booking on `/contact` via a lazy-loaded Calendly facade — zero third-party JS until the visitor opts in, with a zero-JS placeholder card when the embed is unconfigured
- Funnel isolation: automotive early-access leads route to a separate list from general contact leads
- SEO as a first-class concern: per-page metadata via a shared `buildMetadata` helper, JSON-LD structured data from shared builders, navigation rendered from a single source of truth, generated `sitemap.xml` and `robots.txt`
- Custom 404 and thank-you pages so no conversion path dead-ends

**Engineering**

- Fully static output in Phase 1 — every route prerendered at build time, no runtime database, minimal client JS
- Performance budget enforced in CI: Lighthouse CI gates every PR on performance ≥ 95, accessibility ≥ 98, SEO ≥ 95, LCP < 1.5s, CLS < 0.05, TBT < 150ms, and a 260 kB script budget
- Strict separation of concerns: routes fetch, components render, content lives behind typed accessor functions
- Server-only boundaries enforced with the `server-only` package; secrets never reach client components
- TypeScript strict mode with domain contracts (`src/types/`) shared across all layers
- CI runs `lint`, `typecheck` (`next typegen` + `tsc --noEmit`), `build`, and Lighthouse CI on every push and pull request

## Technology stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components) |
| Language | TypeScript (strict) |
| UI | React 19, Tailwind CSS v4, design tokens, Inter + Geist Mono, animated shader hero (`@paper-design/shaders-react`) |
| Validation | Zod 4 |
| Forms | React Server Actions → CRM webhooks (HubSpot/Pipedrive), retry with graceful degradation |
| Scheduling | Calendly (lazy-loaded facade, env-gated) |
| Analytics | Vercel Web Analytics + Speed Insights — cookieless, privacy-friendly, zero-config |
| Perf CI | Lighthouse CI (`@lhci/cli`) enforcing the performance budget |
| Hosting | Vercel (static prerender, preview deployments) |
| Tooling | ESLint 9, PostCSS, `clsx` + `tailwind-merge` |

## Architecture

The core design decision is a **swappable content layer**. Pages never import content directly — they call async accessor functions, and the implementation behind those functions changes by phase while the signatures stay fixed.

```
src/
├── app/          # Routes only — pages compose components and fetch via accessors
├── components/   # Presentation only, never fetches
│   ├── layout/   sections/   forms/   shared/   ui/   home/
├── lib/
│   ├── content/  # Phase 1 "database": typed TS modules behind async accessors
│   ├── cms/      # Phase 2: WPGraphQL client, queries, adapters (stubbed)
│   ├── actions/  # Server Actions (contact + early access → CRM)
│   ├── crm.ts    # Webhook client with retry
│   ├── seo.ts    # buildMetadata + JSON-LD builders
│   ├── design-tokens.ts  # single source for spacing/color/type scales
│   └── format.ts utils.ts
└── types/        # Domain contracts all phases build against
```

How the phases swap without rewrites:

1. **Phase 1 (current):** Content is typed TypeScript modules in `src/lib/content/`, exposed only through async accessor functions. Everything prerenders statically.
2. **Phase 2 (headless CMS):** The same accessors are re-implemented in `src/lib/cms/` against WPGraphQL, with publish webhooks triggering revalidation. Pages and components don't change.
3. **Phase 3 (AWS lead pipeline):** Server Actions change their POST target from CRM webhooks to API Gateway → SQS. Forms don't change.

`src/types/` is the contract that makes this hold: content shapes, form schemas, and component variants are defined once and consumed by every layer. Architecture guardrails and the design-system direction are documented in [`docs/maintenance/`](docs/maintenance/).

### Local development

```bash
npm install
cp .env.example .env.local   # all variables optional in dev
npm run dev                  # http://localhost:3000
```

```bash
npm run lint        # ESLint
npm run typecheck   # next typegen + tsc --noEmit
npm run build       # production build — all routes static in Phase 1
npx lhci autorun    # Lighthouse CI against the local production build
```

## Deployment

- `main` auto-deploys to production on Vercel.
- Every pull request gets a preview URL and must pass CI (lint, typecheck, build, Lighthouse CI). Previews are staging — there is no staging branch.
- `NEXT_PUBLIC_SITE_URL` is required for production builds; secrets live in Vercel project settings (encrypted), never in the repo. See [.env.example](.env.example) for the full variable inventory by phase.
- **Rollback:** Vercel dashboard → Deployments → ⋯ on a previous deployment → *Promote to Production*. No redeploy or git revert required.

## Roadmap

| Phase | Scope | Status |
|---|---|---|
| **1 — Static launch** | Full site, typed content layer, forms → CRM, SEO foundation, enforced perf budget | ✅ v1.0 live |
| **2 — Headless CMS** | WPGraphQL behind the existing accessors, webhook-driven revalidation, client-editable content | Stubbed in `src/lib/cms/` |
| **3 — AWS lead pipeline** | Server Actions → API Gateway → SQS, durable lead processing, first-party analytics | Planned |

v1.0 is feature complete and in maintenance mode. Near-term work is tracked in [`docs/maintenance/ROADMAP.md`](docs/maintenance/ROADMAP.md) — the priorities are regression tests and failure alerting on the lead pipeline, then insights publishing cadence and continued case-study and structured-data coverage.

## Vertical focus: the dealership platform

The playbook is the same for every client — a fast site they own, leads flowing into their own CRM, analytics they control. It works for contractors, trades, clinics, and law firms today, and automotive is where Driftpilot is productizing it first, because the pain there is sharpest: dealerships are locked into legacy website vendors — template sites at $1,500–$2,000/month, no code ownership, no data portability, leads filtered through someone else's CRM.

The long-term plan builds on the agency in tiers:

- **Driftpilot Drive** — a dealership platform covering websites, lead capture, inventory display, and CRM integration as a product rather than a project. Seeded by agency engagements with dealers, so the product is shaped by real rooftop operations, not assumptions.
- **Beyond Drive** — an automotive operations layer: VIN data, financing APIs, service scheduling, and first-party analytics that dealers actually own.

Every dealership engagement today sharpens that product — the automotive dealership case study on `/work` is the first proof point. The `/automotive` page captures early-access interest now — if you run a dealership and want off the platform tax, [join the early access list](https://driftpilot.ca/automotive).

---

## Working with Driftpilot

If you're evaluating Driftpilot for a project: this repository is the sales pitch. The performance numbers, the architecture, and the delivery speed you see here are what your engagement gets.

**Start a conversation:** [driftpilot.ca/contact](https://driftpilot.ca/contact)
