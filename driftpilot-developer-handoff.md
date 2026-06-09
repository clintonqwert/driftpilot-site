# Driftpilot — Developer Handoff Document
**Version 1.0 · June 2026 · Production-Grade**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Stack & Environment](#2-stack--environment)
3. [Repository & Folder Structure](#3-repository--folder-structure)
4. [Component Hierarchy](#4-component-hierarchy)
5. [Routing Map](#5-routing-map)
6. [Data Flow & Content Strategy](#6-data-flow--content-strategy)
7. [Styling & Design Tokens](#7-styling--design-tokens)
8. [Performance Budget](#8-performance-budget)
9. [Forms & Lead Pipeline](#9-forms--lead-pipeline)
10. [SEO Implementation](#10-seo-implementation)
11. [Scalability Plan](#11-scalability-plan)
12. [Phase 2 — WordPress (Headless CMS) Integration](#12-phase-2--wordpress-headless-cms-integration)
13. [Phase 3 — AWS Integration](#13-phase-3--aws-integration)
14. [Environment Variables](#14-environment-variables)
15. [Deployment & CI/CD](#15-deployment--cicd)
16. [Definition of Done](#16-definition-of-done)

---

## 1. Project Overview

Driftpilot is an AI-powered web development agency site that must itself be the proof of capability: Lighthouse 95+, LCP < 1.5s, shipped fast. The site is Phase 1 of a three-phase platform evolution:

| Phase | Scope | Timeline |
|---|---|---|
| **Phase 1 — Static-first launch** | All pages with content from local TS files. No CMS. | Now |
| **Phase 2 — Headless WordPress** | `/insights` and `/work` driven by WPGraphQL. | Q3 2026 |
| **Phase 3 — AWS / Driftpilot Drive** | Inventory feeds, lead routing infra, SaaS groundwork. | Q4 2026+ |

**Build for Phase 1, architect for Phase 3.** Every decision below is made so that later phases are additive, not rewrites.

Companion documents (read before building):
- `driftpilot-strategy.md` — business context and conversion logic
- `driftpilot-sitemap.md` — page inventory, conversion paths, linking rules
- `driftpilot-homepage-spec.md` — section-by-section homepage spec
- `driftpilot-component-inventory.md` — full component props and behaviour
- `driftpilot-design-system.md` — tokens, colors, type, spacing (Tailwind v4)

---

## 2. Stack & Environment

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 15.x (App Router) | RSC-first; Server Actions for forms |
| Language | TypeScript | 5.x | `strict: true`, no `any` in committed code |
| Styling | Tailwind CSS | 4.x | `@theme` tokens in `globals.css` (see design system §9) |
| Fonts | Geist Sans / Geist Mono | via `next/font` | Already wired in `layout.tsx` |
| Hosting | Vercel | — | Edge Network, preview deployments per PR |
| CMS (Phase 2) | WordPress + WPGraphQL | WP 6.x | Headless only — WP never serves public traffic |
| Infra (Phase 3) | AWS | — | S3, Lambda, SQS, RDS (see §13) |
| Analytics | Plausible + GA4 | — | Plausible is primary; both load post-interaction |
| CRM | HubSpot Free (or Pipedrive) | — | Webhook from Server Actions |

**Node:** 20 LTS. **Package manager:** pnpm (lockfile committed). **Linting:** ESLint (next/core-web-vitals) + Prettier, run in CI.

---

## 3. Repository & Folder Structure

```
driftpilot/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout: fonts, NavBar, SiteFooter, analytics
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Tailwind v4 @theme tokens (design system §9)
│   │   ├── sitemap.ts                # Generated sitemap.xml
│   │   ├── robots.ts                 # robots.txt
│   │   ├── not-found.tsx             # Custom 404 (service links + CTA)
│   │   │
│   │   ├── services/
│   │   │   ├── page.tsx              # Services index (ServicesGrid variant="list")
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Service detail (generateStaticParams from content)
│   │   │
│   │   ├── work/
│   │   │   ├── page.tsx              # Case studies index (PortfolioSection variant="index")
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Case study detail
│   │   │
│   │   ├── insights/
│   │   │   ├── page.tsx              # Blog index
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx          # Article
│   │   │   └── tag/[tag]/
│   │   │       └── page.tsx          # Tag archive
│   │   │
│   │   ├── automotive/
│   │   │   ├── page.tsx              # Automotive overview (isolated funnel)
│   │   │   └── early-access/
│   │   │       └── page.tsx          # EarlyAccessForm page
│   │   │
│   │   ├── about/page.tsx
│   │   ├── how-we-work/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── contact/page.tsx          # ContactForm (full variant)
│   │   ├── thank-you/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavBar.tsx            # "use client"
│   │   │   ├── MobileDrawer.tsx      # "use client" — NavBar sub-component
│   │   │   └── SiteFooter.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── WhySection.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── PortfolioFilter.tsx   # "use client" — filter island only
│   │   │   ├── FAQSection.tsx
│   │   │   └── CTABand.tsx
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx       # "use client"
│   │   │   └── EarlyAccessForm.tsx   # "use client" — separate, never merged
│   │   ├── shared/
│   │   │   ├── AutomotiveBanner.tsx
│   │   │   └── SocialProofBar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Pill.tsx
│   │       ├── SectionHeading.tsx
│   │       └── StatCallout.tsx
│   │
│   ├── lib/
│   │   ├── content/                  # Phase 1 content source of truth
│   │   │   ├── navigation.ts         # Nav + footer link maps (single source)
│   │   │   ├── services.ts
│   │   │   ├── process.ts
│   │   │   ├── why.ts
│   │   │   ├── cta.ts                # Per-page CTABand copy
│   │   │   ├── case-studies.ts       # Phase 1 only — replaced by CMS in Phase 2
│   │   │   └── faq/
│   │   │       ├── home.ts
│   │   │       ├── lead-generation.ts
│   │   │       ├── headless-wordpress.ts
│   │   │       ├── nextjs.ts
│   │   │       ├── ai-development.ts
│   │   │       └── automotive.ts
│   │   ├── cms/                      # Phase 2 — empty stub now, see §12
│   │   │   ├── client.ts             # GraphQL fetch wrapper
│   │   │   ├── queries.ts            # WPGraphQL queries
│   │   │   └── adapters.ts           # WP shape → app types
│   │   ├── actions/                  # Server Actions
│   │   │   ├── submit-contact.ts
│   │   │   └── submit-early-access.ts
│   │   ├── crm.ts                    # CRM webhook client (HubSpot/Pipedrive)
│   │   ├── seo.ts                    # Metadata + JSON-LD builders
│   │   └── utils.ts                  # cn(), formatters
│   │
│   └── types/
│       ├── components.ts             # Shared component prop types
│       ├── content.ts                # CaseStudy, Article, Service, FAQItem
│       └── forms.ts                  # ContactFormData, FormResult
│
├── public/
│   ├── og/                           # Static OG images (1200×630)
│   ├── logos/                        # Client logos (Phase 2+)
│   └── favicon.ico / icons
│
├── .env.example                      # All env vars documented, no values
├── .github/workflows/ci.yml          # Lint, typecheck, build, Lighthouse CI
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md                         # Quick-start + links to handoff docs
```

### Structure rules

1. **`app/` contains routing and data fetching only.** Pages compose section components and pass data down. No JSX-heavy logic in `page.tsx` beyond composition.
2. **`components/` never fetches data.** Sections are presentation-only; data arrives as props. This is what makes the Phase 2 CMS swap a data-layer change, not a component change.
3. **`lib/content/` is the Phase 1 database.** Typed TS objects, validated by the `types/content.ts` interfaces. When Phase 2 lands, `case-studies.ts` is deleted and `lib/cms/` takes over — the components never know.
4. **Client components are leaves.** `"use client"` appears only in: NavBar, MobileDrawer, PortfolioFilter, ContactForm, EarlyAccessForm. Never mark a section or page as client.

---

## 4. Component Hierarchy

### Render tree (homepage)

```
app/layout.tsx                          [server]
├── <NavBar variant="transparent" />    [client]
│   └── <MobileDrawer />                [client]
├── app/page.tsx                        [server]
│   ├── <Hero variant="home" />         [server]
│   ├── <SocialProofBar />              [server]
│   ├── <ServicesGrid variant="grid" /> [server]
│   │   └── <Card /> × 4 → <Pill />
│   ├── <WhySection />                  [server]
│   ├── <ProcessSection variant="compact" />  [server]
│   ├── <PortfolioSection variant="highlight" /> [server]
│   │   └── <Card /> + <Pill /> + <StatCallout />
│   ├── <AutomotiveBanner />            [server]
│   ├── <FAQSection defaultOpen={0} />  [server — native <details>]
│   └── <CTABand variant="dark" />      [server]
└── <SiteFooter />                      [server]
```

### Dependency graph (UI primitives → sections)

```
Button ──────┬─→ Hero
             ├─→ CTABand
             ├─→ NavBar
             ├─→ ContactForm / EarlyAccessForm
             └─→ FAQSection (section CTA)

SectionHeading ─→ ServicesGrid · WhySection · ProcessSection
                  · PortfolioSection · FAQSection

Card ────────┬─→ ServicesGrid
             └─→ PortfolioSection

Pill ────────┬─→ PortfolioSection (tech/industry tags)
             └─→ ServicesGrid (highlight label)

StatCallout ─┬─→ SocialProofBar
             └─→ PortfolioSection (mini cards)
```

**Rule:** sections may import from `ui/`; `ui/` primitives never import from `sections/`. No circular dependencies; enforce with `eslint-plugin-import` `no-cycle`.

### Client/server boundary summary

| Component | Boundary | Client JS justification |
|---|---|---|
| NavBar + MobileDrawer | Client | Scroll state, drawer, dropdown, focus trap |
| PortfolioFilter | Client island | Filter pills state on `/work` only |
| ContactForm / EarlyAccessForm | Client | Validation + submission state (submits via Server Action) |
| Everything else | Server | Zero JS |

Homepage ships **NavBar's JS only**. Hold this line — it is the Lighthouse 98 architecture.

---

## 5. Routing Map

| Route | Rendering | Data source (Phase 1 → Phase 2) |
|---|---|---|
| `/` | Static (SSG) | `lib/content/*` → unchanged |
| `/services` | Static | `lib/content/services.ts` → unchanged |
| `/services/[slug]` | Static (`generateStaticParams`) | `lib/content/services.ts` → unchanged |
| `/work` | Static → ISR | `lib/content/case-studies.ts` → WPGraphQL |
| `/work/[slug]` | Static → ISR (60s) | same |
| `/insights` | Static → ISR | placeholder → WPGraphQL |
| `/insights/[slug]` | Static → ISR (60s) | same |
| `/insights/tag/[tag]` | Static → ISR | same |
| `/automotive`, `/automotive/early-access` | Static | `lib/content/*` |
| `/about`, `/how-we-work`, `/pricing`, `/careers` | Static | `lib/content/*` |
| `/contact`, `/thank-you` | Static + Server Action | — |
| `/privacy`, `/terms` | Static | MDX or TS content |

**Phase 1:** every route is fully static (`output` of `next build` shows ○ for all pages). **Phase 2:** only `/work` and `/insights` clusters move to ISR. Nothing else changes.

---

## 6. Data Flow & Content Strategy

### Phase 1 — typed content modules

```typescript
// types/content.ts — the contract everything builds against
export interface CaseStudy {
  slug: string;
  industry: string;
  service: ServiceSlug;
  headline: string;          // outcome in plain language
  methodology: string;
  technologies: string[];
  stat: string;              // "+61% lead submissions"
  problem: string;
  build: string;
  result: string;
  timeframe: string;
  publishedAt: string;       // ISO date
}
```

```typescript
// app/work/page.tsx — Phase 1
import { getAllCaseStudies } from "@/lib/content/case-studies";

export default async function WorkPage() {
  const studies = getAllCaseStudies();
  return <PortfolioSection variant="index" filterable grid={studies} />;
}
```

### The swap contract

`getAllCaseStudies()` and `getCaseStudyBySlug()` are the **only** functions pages call. In Phase 2 their implementation moves from reading TS objects to querying WPGraphQL — same signatures, same return types (enforced by `types/content.ts`). Pages and components are untouched.

```
Phase 1:  page → lib/content/case-studies.ts → typed objects
Phase 2:  page → lib/cms/adapters.ts → WPGraphQL → typed objects
                          ▲
            identical function signatures & return types
```

This is the single most important architectural decision in the codebase. Do not let components import content files directly — always go through the accessor functions.

---

## 7. Styling & Design Tokens

Full token reference: `driftpilot-design-system.md`. Summary of what is binding:

- **Tokens:** paste design system §9 `@theme` block into `src/app/globals.css`. All custom classes (`brand-*`, `ink-*`, `max-w-container`, `h-13`, `shadow-brand`) come from there. No hex values in JSX — ever.
- **Dark surfaces:** `bg-ink-950`; accent text on dark is `brand-400` (never `brand-600` — fails contrast).
- **Container:** every section uses `mx-auto max-w-container px-5 md:px-8`.
- **Section rhythm:** `py-16 md:py-24`.
- **Buttons/cards/radius/shadows:** use the recipes in design system §3–§6 verbatim. The `<Button />` and `<Card />` primitives encode them once.
- **Motion:** entry animations wrapped in `motion-safe:`; durations 150–200ms for controls, 500ms entry; no scale/bounce on buttons.
- **Type:** Geist Sans for everything, Geist Mono for stats/eyebrows/timeline labels; `tabular-nums` on all metrics.

**Linting guard:** add a Stylelint/ESLint rule (or PR checklist item) rejecting arbitrary color values (`text-[#...]`, `bg-[#...]`) outside `globals.css`.

---

## 8. Performance Budget

These are CI-enforced budgets, not aspirations. A PR that breaks them does not merge.

| Metric | Budget | Enforcement |
|---|---|---|
| Lighthouse Performance | ≥ 95 (mobile, throttled) | Lighthouse CI on every PR (preview URL) |
| LCP | < 1.5s | Lighthouse CI assertion |
| CLS | < 0.05 | Lighthouse CI assertion |
| TBT | < 150ms | Lighthouse CI assertion |
| First Load JS (homepage) | < 110 kB | `next build` output check in CI |
| Client components | NavBar, forms, filter island only | Code review + `no-restricted-syntax` lint for stray `"use client"` |
| Images above the fold | 0 (copy-only hero) | Spec rule |
| Third-party scripts | Load on interaction only (Calendly, HubSpot) | Code review |
| Fonts | `next/font` only; no external font requests | Code review |

**Per-image rules:** `next/image` with explicit `width`/`height` or `aspect-ratio` (CLS), `sizes` prop correct, WebP/AVIF output, lazy by default (only LCP-adjacent images get `priority` — and on this site, none do).

---

## 9. Forms & Lead Pipeline

```
ContactForm ("use client")
    │  client-side validation (inline errors, aria-describedby)
    ▼
Server Action: lib/actions/submit-contact.ts
    │  1. zod schema validation (server-side, never trust client)
    │  2. honeypot + min-time-to-submit spam check
    │  3. budget === "under-5k" → tag "disqualified-budget"
    │  4. POST → CRM webhook (lib/crm.ts) with retry (2 attempts)
    │  5. On CRM failure: log to Vercel, queue fallback email — never lose a lead
    ▼
redirect("/thank-you")
```

- Webhook URL lives in `CRM_WEBHOOK_URL` env var — **server-only**, never `NEXT_PUBLIC_`.
- Disqualification is invisible: the user always gets a normal success path.
- `EarlyAccessForm` → `submit-early-access.ts` → **separate webhook/list** (`AUTOMOTIVE_WEBHOOK_URL`). The automotive funnel isolation rule applies at the data layer too.
- Both actions rate-limited by IP (simple in-memory or Vercel KV in Phase 3) — 5 submissions/hour.

---

## 10. SEO Implementation

- **Metadata:** `lib/seo.ts` exports `buildMetadata({ title, description, path, ogImage? })` used by every page's `generateMetadata`. Title patterns per sitemap §8.2.
- **JSON-LD builders** in the same file: `organizationSchema()`, `faqSchema(items)`, `articleSchema(article)`, `serviceSchema(service)`. Injected via `<script type="application/ld+json">` in page components.
- **Sitemap:** `app/sitemap.ts` generates from the same content accessors (so CMS content auto-appears in Phase 2). Priorities per sitemap §8.4.
- **Canonical URLs:** absolute, no trailing slash, set in `buildMetadata`.
- **Heading discipline:** one `<h1>` (Hero headline), `<h2>` per section via `<SectionHeading />`, `<h3>` for cards/FAQ questions. CTABand headline is a styled `<p>`.
- **OG images:** static 1200×630 cards in `public/og/` for Phase 1; consider `next/og` dynamic generation for case studies in Phase 2.

---

## 11. Scalability Plan

### 11.1 Scaling axes and answers

| Axis | Today | At scale | Mechanism |
|---|---|---|---|
| **Content volume** | ~25 pages, TS files | 100s of articles/case studies | Phase 2 CMS + ISR; accessor contract means zero component changes |
| **Traffic** | Low | Spiky (LinkedIn virality, SEO growth) | Static/ISR pages on Vercel Edge — effectively infinite read scaling |
| **Team** | 1 founder | 2–4 engineers | Strict folder conventions, typed content contracts, CI gates, this document |
| **Pages/templates** | 4 service pages | New verticals, landing pages | Service pages are data-driven from `services.ts`; adding a service = adding an object + FAQ file |
| **Forms/leads** | 2 forms → CRM webhook | Lead routing, scoring, nurture | Phase 3: SQS-backed pipeline (§13) — Server Actions just change their POST target |
| **Brand surfaces** | driftpilot.com | Driftpilot Drive app, dealer microsites | Extract `ui/` primitives + tokens into `@driftpilot/ui` package when the second surface appears — not before |

### 11.2 Monorepo trigger

Stay a single repo until **Driftpilot Drive development starts**. Then:

```
driftpilot/ (turborepo + pnpm workspaces)
├── apps/
│   ├── web/            # this site
│   └── drive/          # SaaS dashboard (Phase 3)
├── packages/
│   ├── ui/             # Button, Card, Pill, tokens — extracted from src/components/ui
│   ├── config/         # eslint, tsconfig, tailwind preset
│   └── types/          # shared domain types
```

The current `components/ui` + `globals.css` token discipline is what makes this extraction a one-day job instead of a quarter.

### 11.3 What NOT to add yet

Deliberately excluded from Phase 1 — adding them early is negative-value complexity:

- ❌ State management library (no client state beyond nav/forms)
- ❌ Component library (shadcn etc.) — 5 primitives don't justify it
- ❌ GraphQL codegen — add with Phase 2 when queries exist
- ❌ Storybook — add when team > 2
- ❌ i18n — no multilingual requirement
- ❌ Auth — nothing to log into until Drive

---

## 12. Phase 2 — WordPress (Headless CMS) Integration

### 12.1 Architecture

```
WordPress (private origin)                Vercel (public)
┌──────────────────────────┐             ┌──────────────────────────┐
│  WP Admin (authors)      │             │  Next.js                 │
│  WPGraphQL plugin        │◄────────────│  lib/cms/client.ts       │
│  ACF Pro (field groups)  │  GraphQL    │  (server-side fetch only)│
│                          │  over HTTPS │                          │
│  webhook on publish ─────┼────────────►│  /api/revalidate         │
└──────────────────────────┘             │  → revalidateTag()       │
                                         └──────────────────────────┘
```

- **WP is invisible to the public.** It lives on a subdomain (`cms.driftpilot.com`) behind basic auth or IP allowlist. It serves GraphQL to the Next.js build/server only. No WP themes, no WP frontend, no WP traffic.
- **Plugins (minimal set):** WPGraphQL, ACF Pro + WPGraphQL for ACF, Yoast SEO + WPGraphQL Yoast (meta fields), and nothing else. Every plugin is an attack surface and a query-shape risk.

### 12.2 Content modeling

| App type | WP implementation |
|---|---|
| `Article` | Native posts + categories (topic clusters) + tags |
| `CaseStudy` | Custom Post Type `case_study` with ACF fields: industry, service (select), headline, methodology, technologies (repeater), stat, problem, build, result, timeframe |
| Topic tags | Native taxonomy, mapped to `/insights/tag/[tag]` |

ACF field names mirror `types/content.ts` property names 1:1 — the adapter should be boring.

### 12.3 The adapter layer (the whole point)

```typescript
// lib/cms/adapters.ts
import type { CaseStudy } from "@/types/content";

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const data = await cmsFetch(CASE_STUDIES_QUERY, { tags: ["case-studies"] });
  return data.caseStudies.nodes.map(mapWpCaseStudy);  // WP shape → app shape
}
```

- Components keep receiving `CaseStudy` — they never see WP's shape.
- `cmsFetch` uses `fetch` with `next: { tags }` for tag-based ISR.
- A WP "publish/update" webhook hits `/api/revalidate` (secret-verified) → `revalidateTag("case-studies")`. Content is live in seconds without redeploys.
- **Build resilience:** if WPGraphQL is unreachable at build time, fall back to last-known-good cached JSON (committed snapshot or Vercel data cache) and log loudly. The marketing site must never fail to deploy because the CMS is down.

### 12.4 Migration checklist

1. Provision WP on managed host (Kinsta/WP Engine) at `cms.driftpilot.com`, locked down.
2. Install plugin set; define CPT + ACF groups mirroring `types/content.ts`.
3. Implement `lib/cms/` (client, queries, adapters) against staging WP.
4. Port existing TS case studies into WP; verify adapter output deep-equals the old TS objects (snapshot test).
5. Flip the accessor import, move `/work` + `/insights` to ISR, delete `lib/content/case-studies.ts`.
6. Wire revalidation webhook; load-test a publish → live cycle.

---

## 13. Phase 3 — AWS Integration

AWS enters when Driftpilot Drive (automotive SaaS) development begins. The marketing site stays on Vercel permanently — AWS handles data and backend workloads the SaaS needs.

### 13.1 Target architecture

```
                        ┌─────────────────────────────────────────┐
                        │                AWS                      │
 Dealer DMS feeds       │  ┌─────────┐   ┌────────┐   ┌────────┐ │
 (SFTP/API) ───────────►│  │ S3      │──►│ Lambda │──►│ RDS    │ │
                        │  │ (feeds) │   │ (ETL)  │   │Postgres│ │
                        │  └─────────┘   └────────┘   └───┬────┘ │
                        │                                 │      │
 Site forms ───────────►│  ┌─────────┐   ┌────────┐      │      │
 (Server Actions)       │  │ API GW  │──►│ SQS    │──►Lambda    │
                        │  └─────────┘   │(leads) │   (route to │
                        │                └────────┘    CRM/SMS)  │
                        └─────────────────────────────────┬──────┘
                                                          │
 Vercel (web + Drive frontend) ◄── API Gateway / direct ──┘
```

### 13.2 Service responsibilities

| Service | Role | First use case |
|---|---|---|
| **S3** | Inventory feed landing zone; media/asset storage | Dealer DMS drops nightly CSV/XML via SFTP (AWS Transfer Family) |
| **Lambda** | Feed parsing/normalization (DMS-agnostic ETL); lead routing workers | Parse feed → upsert vehicles → trigger ISR revalidation of inventory pages |
| **SQS** | Durable lead queue — decouples form submission from CRM delivery | Replaces the direct CRM webhook; retries + DLQ mean a CRM outage never loses a lead |
| **RDS (Postgres)** | System of record: vehicles, leads, dealers, attribution | Drive dashboard reads; analytics aggregation |
| **EventBridge** | Scheduled jobs (feed polling, nurture sequence triggers) | 4-email automotive nurture from sitemap §4.3 |
| **CloudWatch** | Logs, alarms (feed failures, queue depth, DLQ non-empty) | Pager-level alert if a dealer feed fails 2 consecutive runs |

### 13.3 Integration points with the existing site

1. **Lead pipeline upgrade (lowest risk, first step):** `lib/actions/submit-*.ts` change their POST target from the CRM webhook to API Gateway → SQS. Same Server Actions, same forms, new durability. The CRM delivery becomes a Lambda consumer.
2. **Inventory display:** dealer microsites / Drive templates (Next.js on Vercel) read vehicles from a thin API (API Gateway + Lambda, or tRPC service on ECS later). Inventory pages use ISR with tag revalidation triggered by the ETL Lambda on feed completion.
3. **Auth boundary:** Drive dashboard auth (Cognito or Auth0 — decide at Phase 3 kickoff) never touches the marketing site.

### 13.4 Principles

- **Infrastructure as code from day one:** SST or Terraform; no console-clicked resources.
- **One AWS account per environment** (dev/prod) under an Organization.
- **Vercel keeps the frontends.** Do not migrate Next.js hosting to AWS — Vercel's edge + preview workflow is a competitive advantage for an agency selling speed.
- **Spend ceiling:** serverless-first (Lambda/SQS/S3 are near-zero at low volume); RDS starts on the smallest instance with auto-pause (Aurora Serverless v2) until dealer count justifies provisioned capacity.

---

## 14. Environment Variables

Documented in `.env.example`; values in Vercel project settings (encrypted) — never committed.

| Variable | Scope | Phase | Purpose |
|---|---|---|---|
| `CRM_WEBHOOK_URL` | server | 1 | Contact form → CRM |
| `AUTOMOTIVE_WEBHOOK_URL` | server | 1 | Early access form → separate list |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | client | 1 | Analytics |
| `NEXT_PUBLIC_GA_ID` | client | 1 | GA4 (loads post-interaction) |
| `WPGRAPHQL_ENDPOINT` | server | 2 | CMS GraphQL URL |
| `WPGRAPHQL_AUTH_TOKEN` | server | 2 | If WP is auth-gated |
| `REVALIDATE_SECRET` | server | 2 | Verifies WP → `/api/revalidate` webhook |
| `AWS_*` / `LEADS_QUEUE_URL` | server | 3 | SQS lead pipeline |

Rule: anything without `NEXT_PUBLIC_` must never appear in a client component. CI greps for accidental leaks.

---

## 15. Deployment & CI/CD

### Branching
- `main` → production (auto-deploy on merge)
- Feature branches → Vercel preview deployments (unique URL per PR)
- No staging branch — previews are staging

### CI pipeline (GitHub Actions, on every PR)

```
1. pnpm install (frozen lockfile)
2. pnpm lint        # ESLint + Prettier check
3. pnpm typecheck   # tsc --noEmit
4. pnpm build       # fails on type/route errors; bundle-size check
5. Lighthouse CI    # against the Vercel preview URL
   └─ asserts: perf ≥ 95, LCP < 1.5s, CLS < 0.05, TBT < 150ms
6. (Phase 2+) snapshot test: CMS adapter output matches types
```

### Deploy checklist (production)
- [ ] Lighthouse CI green on the exact preview that's merging
- [ ] Performance badge constant updated if scores changed (footer — never display a stale score)
- [ ] New routes added to `app/sitemap.ts`
- [ ] New env vars set in Vercel before merge
- [ ] Forms smoke-tested on preview (submission reaches CRM sandbox)

### Rollback
Vercel instant rollback to any previous deployment — document the runbook in README: `Vercel dashboard → Deployments → Promote previous`.

---

## 16. Definition of Done

A feature/PR is done when:

1. **Spec-conformant** — matches the homepage spec / component inventory / design system; deviations are documented in the PR description with reasoning.
2. **Typed** — no `any`, no `@ts-ignore` without a linked issue; content conforms to `types/content.ts`.
3. **Budget-clean** — Lighthouse CI passes; no new client components without justification in the PR.
4. **Accessible** — keyboard navigable, visible focus, labels on all fields, `aria-*` per component inventory, `prefers-reduced-motion` respected.
5. **Responsive** — verified at 375px, 768px, 1280px; touch targets ≥ 44px.
6. **SEO-complete** — `generateMetadata` implemented, JSON-LD where specified, route in sitemap.
7. **Reviewed** — at least one approval; CI green.

---

*Developer Handoff Version 1.0 — June 2026*
*Stack: Next.js 15 App Router · TypeScript 5.x · Tailwind CSS v4 · Vercel*
*Companions: strategy · sitemap · homepage spec · component inventory · design system*
