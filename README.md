# Driftpilot

**An AI-native web development studio for growth-stage businesses and automotive dealerships.**

This repository contains the production site for [driftpilot.com](https://driftpilot.com) — built with Next.js 16, TypeScript, and Tailwind CSS v4, deployed on Vercel. The site is also the portfolio piece: it ships with the same performance budget we hold client work to (Lighthouse 95+, LCP under 1.5s).

---

## Overview

Driftpilot delivers production-ready Next.js and headless WordPress sites in weeks, not months, with lead generation built in from day one. The studio serves two audiences:

- **Growth-stage SMBs** that need a high-performance digital presence without a large agency retainer.
- **Automotive dealerships** paying $1,500+/month for template websites they don't own, with leads going into a vendor's black box.

Web development and lead generation are treated as one engagement, not two. Every site ships with conversion paths, CRM integration, structured data, and analytics wired in — because a fast site that doesn't capture leads is just an expensive brochure.

This codebase demonstrates that approach in practice: a fully static, type-safe marketing site with a content layer designed to swap to a headless CMS without touching a single page or component.

## Features

**Site**

- 15+ routes covering services, case studies, insights (blog with tags), pricing, careers, and a dedicated automotive landing page
- Contact and early-access forms backed by React Server Actions, validated with Zod, delivered to CRM webhooks with retry logic
- Funnel isolation: automotive early-access leads route to a separate list from general contact leads
- SEO as a first-class concern: per-page metadata via a shared `buildMetadata` helper, JSON-LD structured data, generated `sitemap.xml` and `robots.txt`
- Custom 404 and thank-you pages so no conversion path dead-ends

**Engineering**

- Fully static output in Phase 1 — every route prerendered at build time, no runtime database
- Strict separation of concerns: routes fetch, components render, content lives behind typed accessor functions
- Server-only boundaries enforced with the `server-only` package; secrets never reach client components
- TypeScript strict mode with domain contracts (`src/types/`) shared across all layers
- CI-friendly scripts: `lint`, `typecheck` (`next typegen` + `tsc --noEmit`), `build`

## Technology stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components) |
| Language | TypeScript (strict) |
| UI | React 19, Tailwind CSS v4 |
| Validation | Zod 4 |
| Forms | React Server Actions → CRM webhooks (HubSpot/Pipedrive) |
| Analytics | Plausible + Google Analytics (env-gated) |
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
│   └── utils.ts
└── types/        # Domain contracts all phases build against
```

How the phases swap without rewrites:

1. **Phase 1 (current):** Content is typed TypeScript modules in `src/lib/content/`, exposed only through async accessor functions. Everything prerenders statically.
2. **Phase 2 (headless CMS):** The same accessors are re-implemented in `src/lib/cms/` against WPGraphQL, with publish webhooks triggering revalidation. Pages and components don't change.
3. **Phase 3 (AWS lead pipeline):** Server Actions change their POST target from CRM webhooks to API Gateway → SQS. Forms don't change.

`src/types/` is the contract that makes this hold: content shapes, form schemas, and component variants are defined once and consumed by every layer.

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
```

## Deployment

- `main` auto-deploys to production on Vercel.
- Every pull request gets a preview URL. Previews are staging — there is no staging branch.
- Secrets live in Vercel project settings (encrypted), never in the repo. See [.env.example](.env.example) for the full variable inventory by phase.
- **Rollback:** Vercel dashboard → Deployments → ⋯ on a previous deployment → *Promote to Production*. No redeploy or git revert required.

## Roadmap

| Phase | Scope | Status |
|---|---|---|
| **1 — Static launch** | Full site, typed content layer, forms → CRM, SEO foundation | ✅ Live |
| **2 — Headless CMS** | WPGraphQL behind the existing accessors, webhook-driven revalidation, client-editable content | Stubbed in `src/lib/cms/` |
| **3 — AWS lead pipeline** | Server Actions → API Gateway → SQS, durable lead processing, first-party analytics | Planned |

Near-term site work: case study expansion, insights publishing cadence, and structured-data coverage for service and article pages.

## The dealership platform vision

Driftpilot's automotive focus is deliberate. Dealerships are locked into legacy website vendors — template sites at $1,500–$2,000/month, no code ownership, no data portability, leads filtered through someone else's CRM.

The long-term plan builds on the agency in tiers:

- **Driftpilot Drive** — a dealership platform covering websites, lead capture, inventory display, and CRM integration as a product rather than a project. Seeded by agency engagements with dealers, so the product is shaped by real rooftop operations, not assumptions.
- **Beyond Drive** — an automotive operations layer: VIN data, financing APIs, service scheduling, and first-party analytics that dealers actually own.

Every dealership engagement today sharpens that product. The `/automotive` page on the site captures early-access interest now — if you run a dealership and want off the platform tax, [join the early access list](https://driftpilot.com/automotive).

---

## Working with Driftpilot

If you're evaluating Driftpilot for a project: this repository is the sales pitch. The performance numbers, the architecture, and the delivery speed you see here are what your engagement gets.

**Start a conversation:** [driftpilot.com/contact](https://driftpilot.com/contact)
