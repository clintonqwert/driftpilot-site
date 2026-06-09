# Driftpilot — Component Inventory
**Version 1.0 · June 2026 · Developer Specification**

---

## Document Purpose

This inventory defines the reusable component library for driftpilot.com. Each component includes purpose, TypeScript props interface, reusability scope, mobile behaviour, state, and implementation notes. Components are designed for Next.js 15 App Router with Tailwind CSS and TypeScript.

**Design principles:**
1. **Server Components by default.** Only opt into `"use client"` where interactivity requires it.
2. **Props over hardcoding.** Every component that appears on more than one page takes content via props — no inline copy.
3. **One source of truth for content.** Static content lives in `lib/content/*.ts` files; CMS-driven content (case studies, articles) comes from WPGraphQL.
4. **Variants over duplicates.** Components that appear in multiple contexts use a `variant` prop rather than forked copies.

---

## Component Architecture Overview

```
components/
├── layout/
│   ├── NavBar.tsx              ← client (scroll + menu state)
│   ├── SiteFooter.tsx          ← server
│   └── MobileDrawer.tsx        ← client (sub-component of NavBar)
├── sections/
│   ├── Hero.tsx                ← server
│   ├── ServicesGrid.tsx        ← server
│   ├── ProcessSection.tsx      ← server
│   ├── PortfolioSection.tsx    ← server (data fetched in page)
│   ├── FAQSection.tsx          ← server (native <details>, JSON-LD)
│   └── CTABand.tsx             ← server
├── forms/
│   ├── ContactForm.tsx         ← client (validation + submission state)
│   └── EarlyAccessForm.tsx     ← client (variant for /automotive)
├── ui/
│   ├── Button.tsx              ← server
│   ├── Card.tsx                ← server
│   ├── Pill.tsx                ← server
│   ├── SectionHeading.tsx      ← server
│   └── StatCallout.tsx         ← server
└── shared/
    ├── AutomotiveBanner.tsx    ← server
    └── SocialProofBar.tsx      ← server
```

**Shared type definitions** live in `types/components.ts` and are imported by both components and content files.

---

## 01 · `<NavBar />`

### Purpose
Persistent site-wide navigation with always-visible conversion CTA. Handles desktop mega-dropdown, mobile drawer, and scroll-state styling. The single most-rendered component on the site — performance and accessibility here affect every page.

### Props

```typescript
interface NavBarProps {
  /** Visual treatment over hero sections. "transparent" starts see-through
      and solidifies on scroll; "solid" is opaque from load (inner pages). */
  variant?: "transparent" | "solid";   // default: "solid"
  /** Hide the CTA button (e.g., on /contact itself to avoid circular CTA) */
  hideCTA?: boolean;                   // default: false
}
```

Navigation links are **not** props — they are imported from `lib/content/navigation.ts` so the link map has one source of truth shared with `<SiteFooter />`:

```typescript
// lib/content/navigation.ts
export const primaryNav = [
  { label: "Services", href: "/services", children: serviceLinks },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Automotive", href: "/automotive" },
] as const;

export const navCTA = { label: "Book a Scope Call", href: "/contact" } as const;
```

### State (client component)

```typescript
const [isScrolled, setIsScrolled] = useState(false);     // scroll > 60px
const [isMenuOpen, setIsMenuOpen] = useState(false);     // mobile drawer
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
```

### Reusability
**Global — every page.** Rendered once in `app/layout.tsx`. Pages pass variant via a layout context or route-group layouts: homepage uses `transparent`, all inner pages use `solid`.

### Mobile behaviour (< 768px)
- Logo left, hamburger right. Drawer slides in from the right (`translate-x-full → translate-x-0`, 250ms ease).
- Drawer is full-height overlay; body scroll locked while open (`overflow: hidden` on `<body>`).
- Flat link list — Services expands inline (accordion), no mega-dropdown.
- CTA button pinned at drawer bottom, full-width.
- Drawer closes on route change (subscribe to `usePathname()`).
- Focus trap inside drawer while open; `Esc` closes; focus returns to hamburger button.

### Implementation notes
- Scroll listener throttled via `requestAnimationFrame`; passive listener.
- Mega-dropdown: opens on click (not hover-only — hover menus fail on touch laptops); closes on outside click and `Esc`.
- `aria-expanded` on dropdown trigger and hamburger; `aria-current="page"` on active link.
- Render server-side shell with client interactivity hydrated — nav must be visible before JS loads.

---

## 02 · `<Hero />`

### Purpose
Page-opening value proposition block. On the homepage it carries the primary positioning headline; on inner pages it becomes a lighter page-title variant. One component, two variants — prevents the inner-page hero from drifting visually.

### Props

```typescript
interface HeroProps {
  variant?: "home" | "page";          // default: "page"
  eyebrow?: string;                    // small-caps label above headline
  headline: string;                    // rendered as the page <h1>
  subhead?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  /** e.g. "Lighthouse 98 · LCP 0.9s · Delivered in 9 days" */
  proofStat?: string;
  /** Dark background treatment (homepage). Page variant defaults light. */
  dark?: boolean;
}
```

### Variant behaviour

| Aspect | `home` | `page` |
|---|---|---|
| Background | Near-black, white text | Light, dark text |
| Headline size | `text-5xl md:text-6xl` | `text-4xl md:text-5xl` |
| CTAs | Both rendered | Optional, usually primary only |
| Proof stat | Rendered | Omitted |
| Load animation | Staggered fade-in (100ms) | None |

### Reusability
**High.** Homepage (`home` variant), all service pages, `/about`, `/how-we-work`, `/automotive`, `/careers`, `/pricing` (`page` variant). The only pages without it: `/contact` (form-first) and article templates (article header instead).

### Mobile behaviour
- Headline scales down one step (`text-4xl → text-3xl` on home).
- CTAs stack vertically, full-width, primary on top, `gap-3`.
- Vertical padding reduces: `py-24 → py-16`.
- Proof stat wraps to two lines if needed; separator dots preserved.

### Implementation notes
- **The `<h1>` is the LCP element.** No images, no background media in this component, ever.
- Load animation is CSS-only (`@keyframes` + `animation-delay`), no JS, and is disabled under `prefers-reduced-motion`.
- Server component. Zero client JS.

---

## 03 · `<ServicesGrid />`

### Purpose
Present the four service offerings as scannable outcome-first cards. Each card is a routing decision point — name + one outcome sentence + link.

### Props

```typescript
interface ServiceCard {
  name: string;
  outcome: string;                     // one sentence, outcome not features
  href: string;
  icon?: React.ReactNode;              // inline SVG, optional
  highlight?: boolean;                 // visual emphasis (e.g. "Most requested")
  highlightLabel?: string;             // pill text when highlight=true
}

interface ServicesGridProps {
  heading?: string;                    // default: "What we build."
  subhead?: string;
  services: ServiceCard[];
  /** "grid" = 2×2 homepage layout; "list" = stacked rows for /services index
      with longer descriptions */
  variant?: "grid" | "list";           // default: "grid"
  /** Optional section-level CTA below the cards */
  sectionCTA?: { label: string; href: string };
}
```

Service content imported from `lib/content/services.ts` — shared between homepage, `/services` index, and footer link map.

### Reusability
**Medium-high.** Homepage (`grid`), `/services` index (`list` with extended copy), and potentially `/automotive` with a filtered subset. Card sub-component (`<ServiceCard />`) also usable standalone in "related service" blocks on case studies.

### Mobile behaviour
- `grid` variant: 2×2 collapses to single-column stack, `gap-4`.
- `list` variant: already stacked; padding tightens.
- Entire card is the tap target (wrap in `<Link>`), not just the "Learn more" text — minimum 44px touch height guaranteed by card padding.
- `highlight` pill remains visible; does not shift layout (absolutely positioned, space reserved).

### Implementation notes
- Card hover (desktop): border colour shift + slight raise (`translateY(-2px)`), 150ms. No hover-dependent information.
- One `<h3>` per card name; outcome sentence in `<p>`.
- Server component.

---

## 04 · `<ProcessSection />`

### Purpose
Timeline-anxiety killer. Renders the three-phase delivery process with explicit day ranges. Specificity is the persuasion mechanism — the component must make the timeline labels visually prominent.

### Props

```typescript
interface ProcessPhase {
  number: string;                      // "01", "02", "03"
  name: string;                        // "Scope", "Build", "Launch & Hand Off"
  description: string;                 // 1–2 sentences
  timeline: string;                    // "Days 1–3"
}

interface ProcessSectionProps {
  heading?: string;
  subhead?: string;
  phases: ProcessPhase[];
  /** "compact" = homepage 3-column; "detailed" = /how-we-work with
      expanded descriptions and deliverables list per phase */
  variant?: "compact" | "detailed";    // default: "compact"
  sectionCTA?: { label: string; href: string };
}
```

`detailed` variant extends each phase:

```typescript
interface DetailedProcessPhase extends ProcessPhase {
  deliverables?: string[];             // rendered as list in detailed variant
  clientResponsibilities?: string;     // "What we need from you"
}
```

### Reusability
**High.** Homepage (`compact`), `/how-we-work` (`detailed`), and service pages (`compact` with service-specific timelines passed in).

### Mobile behaviour
- Three columns stack vertically.
- Horizontal connector arrow becomes a vertical line/chevron between stacked phases (CSS `::after` on each phase block except the last).
- Phase number background text scales down to avoid overflow.
- Timeline label stays in accent colour, positioned directly under the phase name.

### Implementation notes
- Connector line: CSS pseudo-element only. No SVG asset, no layout shift.
- Server component. The `variant` switch is a render-time branch, not separate components.

---

## 05 · `<PortfolioSection />`

### Purpose
Outcome-first case study display. Featured card + mini-grid on the homepage; full filterable grid on `/work`. Data-driven — content comes from the CMS, not props-as-copy.

### Props

```typescript
interface CaseStudySummary {
  slug: string;
  industry: string;                    // "B2B SaaS"
  service: string;                     // "Lead Generation Systems"
  headline: string;                    // outcome in plain language
  methodology?: string;                // 2 sentences (featured card only)
  technologies?: string[];             // ["Next.js", "Headless WP", "HubSpot"]
  stat?: string;                       // "+61% lead submissions" (mini cards)
}

interface PortfolioSectionProps {
  heading?: string;
  subhead?: string;
  featured?: CaseStudySummary;         // omit → placeholder state renders
  grid?: CaseStudySummary[];           // mini cards (homepage: max 2)
  variant?: "highlight" | "index";     // default: "highlight"
  /** index variant only: enables client-side filter pills */
  filterable?: boolean;
  seeAllHref?: string;                 // default: "/work"
}
```

### Placeholder state
When `featured` is undefined (pre-launch), render the honest empty state: *"Our first case studies are in progress. See how we work →"* linking to `/how-we-work`. **Never render fabricated outcomes.** This state is built into the component, not handled at the page level, so it can't be forgotten.

### Reusability
**High.** Homepage (`highlight`), `/work` (`index` + `filterable`), service pages (`highlight` with a service-filtered featured study), `/automotive` (`highlight` with automotive case study).

### Mobile behaviour
- Featured card: full-width, padding tightens, headline drops one type size.
- Mini-grid: 2 columns collapse to single-column stack.
- `index` variant filter pills: horizontal scroll row (`overflow-x-auto`, `scrollbar-hide`, snap points) instead of wrapping.
- Technology pills wrap to multiple lines; never truncate.

### Implementation notes
- Data fetched in the page (Server Component) via WPGraphQL and passed down — the component is presentation-only.
- `filterable` requires a small client wrapper (`"use client"` boundary around the filter row + grid only, not the whole section).
- Mini-card entire surface clickable; outcome stat in `text-2xl` semibold.

---

## 06 · `<FAQSection />`

### Purpose
Objection handling + SEO rich results. Accordion of question/answer pairs with `FAQPage` JSON-LD injected automatically from the same data — schema and visible content can never drift apart.

### Props

```typescript
interface FAQItem {
  question: string;
  answer: string;                      // plain text or limited markdown
}

interface FAQSectionProps {
  heading?: string;
  items: FAQItem[];
  /** Index of item open on load. null = all collapsed. Default: 0 */
  defaultOpen?: number | null;
  /** Inject FAQPage JSON-LD. Disable when the same questions already
      appear in schema elsewhere on the page. Default: true */
  withSchema?: boolean;
  sectionCTA?: { label: string; href: string };
}
```

### Reusability
**High.** Homepage (6 general questions), every service page (5–7 service-specific questions), `/pricing` (pricing objections), `/automotive` (dealer-specific questions). Per-page FAQ content lives in `lib/content/faq/*.ts`.

### Mobile behaviour
- Full-width touch targets; entire `<summary>` row tappable (min 48px height).
- `+`/`−` icon right-aligned, does not shrink question text — question wraps instead.
- Open-state answer padding reduces slightly.

### Implementation notes
- Native `<details>`/`<summary>` — works without JS, accessible by default.
- `defaultOpen` sets the `open` attribute server-side (no hydration flicker).
- Height animation via CSS `grid-template-rows: 0fr → 1fr` technique (animates `auto` height without JS measurement). Disabled under `prefers-reduced-motion`.
- JSON-LD rendered in a `<script type="application/ld+json">` from the same `items` array.
- Server component — no client JS required.

---

## 07 · `<CTABand />`

### Purpose
End-of-page conversion capture. Dark full-width band with headline, supporting line, and dual CTA. Visually bookends the page with the hero. The single most reused conversion element on the site.

### Props

```typescript
interface CTABandProps {
  headline: string;
  subhead?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  /** "dark" = default near-black; "accent" = brand-colour band used in
      the automotive funnel to keep its visual identity distinct */
  variant?: "dark" | "accent";         // default: "dark"
}
```

### Per-page copy convention

| Page | Headline | Primary CTA |
|---|---|---|
| Homepage | Ready to build something that converts? | Book a Free Scope Call → `/contact` |
| Service pages | Ready to [service outcome]? | Book a Free Scope Call → `/contact` |
| `/work` | Want results like these? | Book a Free Scope Call → `/contact` |
| `/automotive` | Own your website. Own your leads. | Join Early Access → `/automotive/early-access` |
| `/insights` articles | Like how we think? | Work with us → `/contact` |

Note the automotive funnel isolation rule from the sitemap: automotive pages pass the early-access CTA, never `/contact`.

### Reusability
**Maximum.** Bottom of every content page. Only `/contact`, `/thank-you`, and legal pages omit it.

### Mobile behaviour
- CTAs stack vertically, primary on top, both full-width.
- `padding-y: 80px → 56px`.
- Headline drops one type size; max-width constraint removed (text uses full padded width).

### Implementation notes
- Server component, zero JS.
- Headline rendered as `<p>` styled as display text, **not** a heading element — it's a conversion prompt, not document structure, and shouldn't pollute the heading outline.

---

## 08 · `<ContactForm />`

### Purpose
Qualified lead capture with built-in disqualification. The five-field intake form that feeds the CRM webhook. The budget dropdown is the qualification gate — the form is doing sales triage, not just message collection.

### Props

```typescript
interface ContactFormProps {
  /** Where the submission posts. Default: server action → CRM webhook */
  onSubmitAction?: (data: ContactFormData) => Promise<FormResult>;
  /** Pre-select a service when arriving from a service page CTA
      (read from ?service= query param at page level) */
  defaultService?: string;
  /** Compact variant drops the "how did you find us" field for
      embedding in non-/contact contexts */
  variant?: "full" | "compact";        // default: "full"
}

interface ContactFormData {
  goal: string;                        // "What are you trying to accomplish?"
  currentURL?: string;                 // optional — they may not have a site
  timeline: "asap" | "1-3mo" | "3-6mo" | "exploring";
  budget: "under-5k" | "5-15k" | "15-30k" | "30k-plus";
  source?: string;                     // "How did you find us?"
  email: string;
  name: string;
}

interface FormResult {
  success: boolean;
  error?: string;                      // user-facing message on failure
}
```

### Field order & UX logic

```
1. Name                  (text, required)
2. Email                 (email, required, validated on blur)
3. What are you trying   (textarea, required, min 20 chars —
   to accomplish?         forces a real answer, filters tire-kickers)
4. Current website       (url, optional, placeholder "https://…")
5. Timeline              (select, required)
6. Approximate budget    (select, required)
7. How did you find us?  (select, optional — full variant only)

[Send →]                 (full-width on mobile)
```

### Submission flow
1. Client-side validation (inline errors under fields, `aria-describedby` linkage).
2. Submit → Next.js Server Action → CRM webhook (HubSpot/Pipedrive) with budget tag.
3. `budget === "under-5k"` → tagged `disqualified-budget` in CRM; auto-reply email routes to self-serve resources. **The form still submits and thanks the user normally** — disqualification is invisible and dignified, never an error message.
4. Success → `router.push("/thank-you")`.
5. Failure → inline error banner above submit button with retry; field values preserved.

### Reusability
**Medium.** `/contact` (full). The `compact` variant can embed at the bottom of high-intent service pages if A/B testing shows inline forms outperform the CTA-to-contact-page hop. `<EarlyAccessForm />` (automotive) is a **separate component** — different fields (dealership name, rooftop count, current vendor), different webhook, different funnel. Do not force them into one component with conditionals.

### Mobile behaviour
- All fields full-width, stacked, `gap-4`.
- Input font size ≥ 16px (prevents iOS auto-zoom on focus).
- Selects use native pickers — no custom dropdown JS on mobile.
- Submit button full-width, fixed comfortable height (52px).
- Error summary scrolls into view on failed validation.

### Implementation notes
- `"use client"` for validation/submission state; submission itself via Server Action (no API route needed, no client-exposed webhook URL).
- Honeypot field + minimum-time-to-submit check for spam (no CAPTCHA — friction kills conversion).
- Disable submit while pending; show inline spinner with `aria-busy`.
- Every field has a visible `<label>` — no placeholder-as-label.

---

## 09 · `<SiteFooter />`

### Purpose
Site-wide utility navigation, trust signals, and final contact access. Four-column link map + copyright bar. Pure navigation — no selling.

### Props

```typescript
interface SiteFooterProps {
  /** Suppress the Lighthouse badge if scores ever dip during a rebuild —
      never display a stale or false score */
  showPerformanceBadge?: boolean;      // default: true
}
```

All link content imported from `lib/content/navigation.ts` (same source as `<NavBar />`) plus `footerColumns` definition. Footer-specific links (Privacy, Terms, Careers) live only in the footer map.

### Reusability
**Global — every page.** Rendered once in `app/layout.tsx`.

### Mobile behaviour
- Column 1 (brand) full-width on top.
- Columns 2–4 in a 2-column grid; column 4 (Get Started) spans full width below.
- Link rows get taller tap spacing (`py-2` minimum per link).
- Copyright bar: text wraps to two lines, centred.

### Implementation notes
- Server component, zero JS.
- `<nav aria-label="Footer navigation">` wrapping columns 2–3; column 4 CTA is a regular link/button.
- Column headers are `<p>` (small caps, letter-spaced), not headings.
- Performance badge value comes from a build-time constant — update it as part of the deploy checklist, not hardcoded in JSX.

---

## Shared UI Primitives

These small components are used inside the sections above. Defining them once prevents per-section drift.

### `<Button />`

```typescript
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";                  // default: "md"
  href?: string;                       // renders <Link>; omit → <button>
  children: React.ReactNode;
  fullWidthOnMobile?: boolean;         // default: true for CTAs
}
```
Used by: Hero, CTABand, NavBar, ContactForm, FAQSection CTA. **All CTAs on the site go through this component** — one place to adjust radius, padding, focus ring.

### `<SectionHeading />`

```typescript
interface SectionHeadingProps {
  heading: string;                     // rendered as <h2>
  subhead?: string;
  align?: "left" | "center";           // default: "left"
}
```
Used by: ServicesGrid, ProcessSection, PortfolioSection, FAQSection, WhySection. Guarantees consistent heading hierarchy (`<h2>` for every section) and spacing rhythm.

### `<Pill />`

```typescript
interface PillProps {
  label: string;
  tone?: "neutral" | "accent";         // default: "neutral"
}
```
Used by: PortfolioSection (technology + industry tags), ServicesGrid (highlight label), case study pages.

### `<StatCallout />`

```typescript
interface StatCalloutProps {
  figure: string;                      // "47% more leads in 90 days."
  label: string;                       // "Lead Generation Systems"
}
```
Used by: SocialProofBar, case study pages, `/automotive`.

---

## Reusability Matrix

| Component | Home | Services | Work | Insights | Automotive | About | Contact | How We Work |
|---|---|---|---|---|---|---|---|---|
| NavBar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Hero | ✓ home | ✓ page | ✓ page | — | ✓ page | ✓ page | — | ✓ page |
| ServicesGrid | ✓ grid | ✓ list | — | — | subset | — | — | — |
| ProcessSection | ✓ compact | ✓ compact | — | — | — | — | — | ✓ detailed |
| PortfolioSection | ✓ highlight | ✓ highlight | ✓ index | — | ✓ highlight | — | — | — |
| FAQSection | ✓ | ✓ | — | — | ✓ | — | — | ✓ |
| CTABand | ✓ dark | ✓ dark | ✓ dark | ✓ dark | ✓ accent | ✓ dark | — | ✓ dark |
| ContactForm | — | (compact, A/B) | — | — | — | — | ✓ full | — |
| SiteFooter | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Client/Server Boundary Summary

| Component | Rendering | Why |
|---|---|---|
| NavBar | Client | Scroll state, drawer, dropdown |
| Hero | Server | Static; CSS-only animation |
| ServicesGrid | Server | Static content |
| ProcessSection | Server | Static content |
| PortfolioSection | Server (+ client filter island in `index` variant) | CMS data fetched in page; filtering needs state |
| FAQSection | Server | Native `<details>` needs no JS |
| CTABand | Server | Static |
| ContactForm | Client (+ Server Action) | Validation and submission state |
| SiteFooter | Server | Static |

Total client JS on the homepage: **NavBar only.** This is the architecture that makes Lighthouse 98 achievable rather than aspirational.

---

## Content File Structure

```
lib/content/
├── navigation.ts        ← nav + footer link maps (single source)
├── services.ts          ← service cards (home, /services, footer)
├── process.ts           ← phases (compact + detailed)
├── why.ts               ← differentiators
├── faq/
│   ├── home.ts
│   ├── lead-generation.ts
│   ├── headless-wordpress.ts
│   ├── nextjs.ts
│   ├── ai-development.ts
│   └── automotive.ts
└── cta.ts               ← per-page CTABand copy map
```

Case studies and articles are **not** in content files — they come from headless WordPress via WPGraphQL, queried in page-level Server Components and passed to `<PortfolioSection />` as props.

---

*Component Inventory Version 1.0 — June 2026*
*Stack: Next.js 15 App Router · TypeScript 5.x · Tailwind CSS · WPGraphQL*
*Companion documents: driftpilot-homepage-spec.md · driftpilot-sitemap.md*
