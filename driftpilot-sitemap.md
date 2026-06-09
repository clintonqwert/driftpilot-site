# Driftpilot — Complete Sitemap
**Version 1.0 · June 2026**

---

## Table of Contents

1. [Navigation Structure](#1-navigation-structure)
2. [Full Page Inventory](#2-full-page-inventory)
3. [Footer Structure](#3-footer-structure)
4. [Conversion Paths](#4-conversion-paths)
5. [User Journey — Business Owner](#5-user-journey--business-owner)
6. [User Journey — Software Recruiter](#6-user-journey--software-recruiter)
7. [Internal Linking Logic](#7-internal-linking-logic)
8. [URL Schema & Metadata Notes](#8-url-schema--metadata-notes)

---

## 1. Navigation Structure

### 1.1 Primary Navigation (Desktop)

```
DRIFTPILOT [logo]          Services    Work    Insights    Automotive    → Book a Scope Call [CTA button]
```

| Label | Route | Behaviour |
|---|---|---|
| **Services** | `/services` | Dropdown (see 1.2) |
| **Work** | `/work` | Direct link |
| **Insights** | `/insights` | Direct link |
| **Automotive** | `/automotive` | Direct link |
| **Book a Scope Call** | `/contact` | Primary CTA — button style, always visible |

### 1.2 Services Mega-Dropdown

Triggered on hover/click of the Services nav item. Two columns: service links left, featured content right.

```
┌─────────────────────────────────────────────────────┐
│  SERVICES                    FEATURED               │
│  ─────────────────           ─────────────────────  │
│  AI Website Development      [Case study card]      │
│  Headless WordPress          "47% more leads in     │
│  Next.js Development          90 days →"            │
│  Lead Generation Systems                            │
│                              → See all work         │
│  ─────────────────                                  │
│  Not sure? → How We Work                            │
└─────────────────────────────────────────────────────┘
```

| Label | Route | Intent |
|---|---|---|
| AI Website Development | `/services/ai-website-development` | Broadest entry point |
| Headless WordPress | `/services/headless-wordpress` | CMS-aware buyers |
| Next.js Development | `/services/nextjs-development` | Technical / developer-adjacent buyers |
| Lead Generation Systems | `/services/lead-generation-systems` | Highest-intent, outcome-focused buyers |
| How We Work | `/how-we-work` | Objection-handling for first-time visitors |

### 1.3 Mobile Navigation

Hamburger menu. Flat list — no mega-dropdown.

```
Services  ›
  AI Website Development
  Headless WordPress
  Next.js Development
  Lead Generation Systems
Work
Insights
Automotive
──────────────
Book a Scope Call  [CTA]
```

### 1.4 Secondary / Utility Navigation (Top Bar — Optional)

Small strip above primary nav. Desktop only. Used for trust signals and quick access.

```
★ Lighthouse 98 · LCP 0.9s  |  Built on Next.js + Headless WP  |  Based in [City]  |  hello@driftpilot.com
```

---

## 2. Full Page Inventory

### 2.1 Core Pages

| # | Page | Route | Priority | Primary Audience | Goal |
|---|---|---|---|---|---|
| 1 | Homepage | `/` | P0 | Business Owner, Recruiter | Qualify intent, route to conversion |
| 2 | Services Index | `/services` | P0 | Business Owner | Route to correct service page |
| 3 | Work (Case Studies) | `/work` | P0 | Business Owner, Recruiter | Build credibility, pre-close |
| 4 | Contact / Intake | `/contact` | P0 | Business Owner | Qualified lead capture |
| 5 | How We Work | `/how-we-work` | P1 | Business Owner | Objection handling, trust |
| 6 | About | `/about` | P1 | Business Owner, Recruiter | Founder story, team, vision |
| 7 | Insights (Blog Index) | `/insights` | P1 | Business Owner (SEO) | Organic acquisition |
| 8 | Automotive | `/automotive` | P1 | Dealer Principal | SaaS early access capture |
| 9 | Pricing | `/pricing` | P1 | Business Owner | Qualify budget, reduce friction |

### 2.2 Service Detail Pages

| # | Page | Route | Target Persona | Primary Keyword |
|---|---|---|---|---|
| 10 | AI Website Development | `/services/ai-website-development` | Persona A (Founder) | "AI web development agency" |
| 11 | Headless WordPress | `/services/headless-wordpress` | Persona C (Marketing Manager) | "headless WordPress agency" |
| 12 | Next.js Development | `/services/nextjs-development` | Persona A — technical | "Next.js development agency" |
| 13 | Lead Generation Systems | `/services/lead-generation-systems` | Personas A + C | "lead generation website" |

Each service page follows a fixed template:
```
1. Problem statement
2. Driftpilot's approach
3. Deliverables list
4. Timeline & process
5. Inline case study / outcome stat
6. FAQ (5–7 items)
7. CTA → /contact
```

### 2.3 Case Study Pages

| # | Page | Route | Notes |
|---|---|---|---|
| 14 | Case Studies Index | `/work` | Grid view, filter by service/industry |
| 15 | Case Study (template) | `/work/[slug]` | Outcome-first format (see §3.3 of strategy) |

Minimum viable case study fields:
- Business problem
- What Driftpilot built
- Measurable result + timeframe
- Technology used
- Related service (tagged + linked)

### 2.4 Content Hub (Blog)

| # | Page | Route | Notes |
|---|---|---|---|
| 16 | Insights Index | `/insights` | Paginated, filterable by topic |
| 17 | Article (template) | `/insights/[slug]` | Long-form, 1,500–3,000 words |
| 18 | Topic Tag Page | `/insights/tag/[tag]` | SEO topic clustering |

Seeded topic clusters:

| Cluster | Target Articles |
|---|---|
| AI Web Development | "How we use AI to build websites 3x faster", "AI-assisted Next.js: what it means for timelines" |
| Headless WordPress | "Headless WP vs Webflow: an honest comparison", "Why we chose WPGraphQL" |
| Lead Generation | "Why your website isn't generating leads (and how to fix it)", "Lead gen for [vertical]" |
| Automotive | "Why dealership websites are broken", "Replacing Dealer.com: what dealers need to know" |
| Next.js | "Next.js App Router vs Pages Router for marketing sites", "Next.js vs Gatsby in 2026" |

### 2.5 Automotive SaaS Pages

| # | Page | Route | Notes |
|---|---|---|---|
| 19 | Automotive Overview | `/automotive` | Soft pitch, early access CTA, no hard sell |
| 20 | Driftpilot Drive Early Access | `/automotive/early-access` | Email capture form, expected ship date, feature preview |

### 2.6 Legal & Utility Pages

| # | Page | Route | Notes |
|---|---|---|---|
| 21 | Privacy Policy | `/privacy` | Required for GDPR / CASL compliance |
| 22 | Terms of Service | `/terms` | Linked from footer, contact forms |
| 23 | 404 | `/404` | Custom — include service links + CTA |
| 24 | Thank You (post-form) | `/thank-you` | Confirms submission, sets expectations, links to Work |

### 2.7 Recruiter-Specific Page

| # | Page | Route | Notes |
|---|---|---|---|
| 25 | Careers / Open to Work | `/careers` | Founder's stack, work style, what Driftpilot is building |

> **Note on `/careers`:** This page serves software recruiters as a secondary audience. It is not a traditional job board — it frames Driftpilot's engineering culture, technology choices, and long-term vision to attract collaborators and future hires, while also serving as a credibility signal for technical buyers who may check the team page.

---

## 3. Footer Structure

### 3.1 Footer Layout (Desktop — 4 columns)

```
┌───────────────┬───────────────┬───────────────┬───────────────┐
│  DRIFTPILOT   │  SERVICES     │  COMPANY      │  GET STARTED  │
│               │               │               │               │
│  AI-powered   │  AI Websites  │  Work         │  Book a Call  │
│  web dev for  │  Headless WP  │  About        │  /contact     │
│  businesses   │  Next.js Dev  │  How We Work  │               │
│  that want    │  Lead Gen     │  Insights     │  hello@       │
│  results.     │  Automotive   │  Pricing      │  driftpilot   │
│               │               │  Careers      │  .com         │
│  Lighthouse   │               │               │               │
│  98 · LCP     │               │  Privacy      │  [LinkedIn]   │
│  0.9s         │               │  Terms        │  [GitHub]     │
└───────────────┴───────────────┴───────────────┴───────────────┘
© 2026 Driftpilot. Built with Next.js + Headless WordPress. Lighthouse 98.
```

### 3.2 Footer Link Map

**Column 1 — Brand**
- Tagline (non-linked)
- Lighthouse score badge → links to `/` (homepage with embedded score)

**Column 2 — Services**
- AI Website Development → `/services/ai-website-development`
- Headless WordPress → `/services/headless-wordpress`
- Next.js Development → `/services/nextjs-development`
- Lead Generation Systems → `/services/lead-generation-systems`
- For Dealerships → `/automotive`

**Column 3 — Company**
- Work → `/work`
- About → `/about`
- How We Work → `/how-we-work`
- Insights → `/insights`
- Pricing → `/pricing`
- Careers → `/careers`
- Privacy Policy → `/privacy`
- Terms of Service → `/terms`

**Column 4 — Get Started**
- Book a Scope Call → `/contact` (button style)
- Email: `hello@driftpilot.com`
- LinkedIn (icon + link)
- GitHub (icon + link — supports open-by-default engineering brand)

### 3.3 Footer CTA Block (Above Footer Columns)

A full-width band directly above the footer columns, repeated on every page:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Ready to build something that converts?                   │
│   Most projects are in production within 4 weeks.           │
│                                                             │
│   [Book a Free Scope Call]    [See Our Work →]              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Conversion Paths

### 4.1 Primary Conversion Path — "Book a Scope Call"

The highest-value conversion action. Maps to inbound qualified leads.

```
Entry Point
    │
    ├─ Homepage hero CTA
    ├─ Service page CTAs
    ├─ Case study page CTA
    ├─ Footer CTA band (all pages)
    └─ Navigation CTA button (all pages)
    │
    ▼
/contact
    • What are you trying to accomplish? (open field)
    • Current website URL
    • Timeline (ASAP / 1–3mo / 3–6mo / Exploring)
    • Budget (Under $5K / $5–15K / $15–30K / $30K+)
    • How did you find us?
    │
    ▼
/thank-you
    • Confirmation message + expected response time (< 24h)
    • "While you wait" links → /work, /how-we-work
    │
    ▼
Discovery call (Calendly embed on /contact or in follow-up email)
    │
    ▼
Proposal → Contract → Kickoff
```

**Disqualification gate:** Budget dropdown filters out `Under $5K` leads automatically. CRM tag applied; auto-reply redirects to a self-serve resource or waitlist.

### 4.2 Secondary Conversion Path — "See Our Work"

Lower-friction path for visitors not ready to book. Builds trust before conversion.

```
Entry Point
    │
    ├─ Homepage hero secondary CTA
    ├─ Services dropdown featured card
    ├─ Insights articles (inline CTAs)
    └─ Footer column link
    │
    ▼
/work
    • Case study grid (filter by service, industry)
    │
    ▼
/work/[slug]
    • Outcome-first case study
    • Inline CTA: "Built something like this for you?"
    • Related service link
    │
    ▼
/services/[related-slug]  OR  /contact
```

### 4.3 Tertiary Conversion Path — Automotive Early Access

Captures Dealer Principal (Persona B) leads before Driftpilot Drive exists.

```
Entry Point
    │
    ├─ Homepage automotive signal block (near footer)
    ├─ /automotive page CTA
    ├─ Footer "For Dealerships" link
    └─ Automotive-tagged blog posts
    │
    ▼
/automotive
    • Problem statement: vendor lock-in, platform fees, no data ownership
    • What's coming: Driftpilot Drive teaser (no hard spec)
    • "Own your website. Own your leads." positioning
    │
    ▼
/automotive/early-access
    • Email capture form
    • Fields: name, dealership name, rooftop count, current vendor
    • No-commitment framing: "Be first to know when we launch"
    │
    ▼
Email nurture sequence (4 emails over 8 weeks)
    1. Welcome + problem validation
    2. Case study: dealership migrated off legacy vendor
    3. Driftpilot Drive feature preview
    4. Invite to 1:1 beta call
```

### 4.4 Content → Lead Path (SEO)

Converts organic search traffic via Insights articles.

```
Google Search
    │
    ▼
/insights/[slug]  (long-form article)
    • Inline CTA: contextual to article topic
      e.g. "Building a lead gen site for your dealership? Here's how we do it →"
    • End-of-article CTA: "Work with us" → /contact
    • Related articles (internal links)
    │
    ▼
/services/[related-slug]  OR  /contact
```

### 4.5 Recruiter Conversion Path

Secondary audience. Goal is not revenue — it is talent pipeline and credibility.

```
Entry Point
    │
    ├─ LinkedIn (founder posts link to site)
    ├─ GitHub (open-source links to driftpilot.com)
    └─ Direct search ("Driftpilot" or founder name)
    │
    ▼
/  (Homepage)
    • Stack signals in subhead and tech section
    • Lighthouse score (proof of craft)
    │
    ▼
/about
    • Founder background
    • Technology philosophy
    • Long-term SaaS vision (signals ambition + scope)
    │
    ▼
/careers
    • Current stack: Next.js 15, TypeScript, Tailwind, Headless WP, AWS, Vercel
    • Work style: async-first, AI-native, outcome-oriented
    • What we're building (agency now, SaaS next)
    • How to reach out: email or LinkedIn
    │
    ▼
Direct email or LinkedIn message to founder
```

---

## 5. User Journey — Business Owner

Three sub-journeys mapped to the three primary Personas from the strategy document.

---

### Journey 5A — Growth-Stage Founder (Persona A)

**Trigger:** Missed a sales opportunity; prospect mentioned the website looked outdated.
**Entry:** Google search → "next.js agency" or "headless wordpress agency"

```
STAGE 1 — AWARENESS
Google search: "next.js development agency"
    │
    ▼
/insights/[article]  — "Next.js vs WordPress for B2B marketing sites"
    • Reads full article (1,800 words)
    • Sees inline CTA: "We build in Next.js. Here's our work →"
    │
    ▼
STAGE 2 — CONSIDERATION
/work
    • Scans case study grid
    • Filters by "B2B / SaaS"
    │
    ▼
/work/[b2b-saas-case-study]
    • Reads outcome: "Rebuilt in 9 days. Lead form submissions up 61%."
    • Reads methodology: Next.js App Router, HubSpot integration
    • Clicks: "We built this. We can build yours." → /contact
    │
    ▼
STAGE 3 — INTENT
/contact
    • Fills form: "Redesign our marketing site, current one is slow and hard to update"
    • URL: their current site
    • Timeline: 1–3 months
    • Budget: $15–30K
    • Source: Google
    │
    ▼
/thank-you
    • Reads "While you wait" links → browses /how-we-work
    │
    ▼
STAGE 4 — EVALUATION
Discovery call (within 24 hours)
    • Scoping document sent within 48 hours
    • Proposal sent within 5 days
    │
    ▼
STAGE 5 — CLOSE
Contract signed → 50% deposit → kickoff call
    │
    ▼
STAGE 6 — RETENTION
Project complete → retainer offer at handoff
    • Growth retainer: $1,500/month
    • Quarterly architecture reviews
```

**Key pages:** `/insights/[slug]` → `/work` → `/work/[slug]` → `/contact` → `/thank-you` → `/how-we-work`

---

### Journey 5B — Automotive Dealer Principal (Persona B)

**Trigger:** Vendor (Dealer.com) raised platform fees again. A peer at a 20 Group mentioned they'd switched.
**Entry:** Cold outreach email → `/automotive`

```
STAGE 1 — AWARENESS
Cold email: "You pay $1,800/month for a website you don't own. We build ones you do."
    • Link: driftpilot.com/automotive
    │
    ▼
/automotive
    • Reads problem statement: vendor lock-in, black-box leads, no data ownership
    • Sees stat: "Average dealer pays $21,600/year for a template they can't touch."
    • Reads positioning wedge: "Own your website. Own your leads."
    • CTA: "Join the early access list"
    │
    ▼
STAGE 2 — CONSIDERATION
/automotive/early-access
    • Fills form: name, dealership, 2 rooftops, currently on DealerSocket
    • Enters email nurture sequence
    │
    ▼
Email #1 — Welcome + problem framing (Day 0)
Email #2 — Case study: dealership migration (Day 7)
    • Dealer clicks case study link → /work/[automotive-case-study]
    │
    ▼
/work/[automotive-case-study]
    • Reads: "Independent dealer. Off DealerSocket in 3 weeks. Leads now go to their CRM."
    • Clicks "Talk to us about your dealership" → /contact
    │
    ▼
STAGE 3 — INTENT
/contact
    • Form: "Want to get off DealerSocket, need inventory integration and lead capture"
    • Budget: $30K+
    • Timeline: 1–3 months
    │
    ▼
STAGE 4 — EVALUATION
Discovery call → platform migration scoping → proposal
    │
    ▼
STAGE 5 — CLOSE
Platform package: $38,000
    │
    ▼
STAGE 6 — RETENTION + SAAS CONVERSION
Month 6: introduced to Driftpilot Drive beta waitlist
Month 12: migration discount offer — agency project cost credited against first year of SaaS
```

**Key pages:** `/automotive` → `/automotive/early-access` → email sequence → `/work/[slug]` → `/contact`

---

### Journey 5C — Marketing Manager (Persona C)

**Trigger:** New VP of Marketing asked why the bounce rate is 80%. Three quotes requested.
**Entry:** Google → "lead generation website for HVAC" or LinkedIn ad

```
STAGE 1 — AWARENESS
Google search: "lead generation website for service business"
    │
    ▼
/insights/[article] — "Why your service business website isn't generating leads"
    • Reads full article
    • End CTA: "We build lead gen systems, not just websites →"
    │
    ▼
STAGE 2 — CONSIDERATION
/services/lead-generation-systems
    • Problem statement: forms that go nowhere, no CRM connection, high bounce rate
    • Deliverables list: CRM integration, conversion-optimised pages, attribution setup
    • Outcome stat: inline case study
    • FAQ: "How long does it take?" / "Do you work with HubSpot?"
    │
    ▼
/pricing
    • Confirms Growth package ($15–25K) fits budget
    • Sees retainer tiers
    │
    ▼
STAGE 3 — INTENT
/contact
    • Form: "Need a site rebuild focused on lead gen, currently no CRM integration"
    • Budget: $15–30K
    • Timeline: 1–3 months (boss wants results this quarter)
    │
    ▼
STAGE 4 — EVALUATION
Discovery call → proposal → internal approval process
    • Shares /work link with VP of Marketing as supporting evidence
    │
    ▼
STAGE 5 — CLOSE + RETENTION
Growth package signed → monthly retainer upsell at 30-day review
```

**Key pages:** `/insights/[slug]` → `/services/lead-generation-systems` → `/pricing` → `/contact`

---

## 6. User Journey — Software Recruiter

**Goal:** Assess founder's technical calibre, stack choices, and company trajectory.
**Entry:** LinkedIn (founder's profile or a post) → `driftpilot.com`

```
STAGE 1 — INITIAL IMPRESSION
LinkedIn profile → driftpilot.com link
    │
    ▼
/  (Homepage)
    • Sees: "Built with Next.js + Headless WP · Lighthouse 98"
    • Scans services — recognises stack (Next.js, TypeScript, Tailwind, AWS)
    • Notes: AI-native positioning signals modern tooling fluency
    • CTA not relevant — navigates to /about
    │
    ▼
STAGE 2 — DEPTH CHECK
/about
    • Founder background: engineering philosophy, prior experience
    • Technology philosophy: why Next.js, why headless, why AI-native
    • Long-term vision: Driftpilot Drive / automotive SaaS
        → signals: product thinking, market ambition, not just freelance work
    │
    ▼
STAGE 3 — PROOF OF CRAFT
/work  (case studies)
    • Reads 1–2 case studies — notes technical depth in methodology sections
    • Sees real outcomes with real numbers
    │
    ▼
/  (Homepage — Lighthouse score badge)
    OR
    GitHub profile (linked from footer)
    • Open-source components or public repos signal engineering quality
    │
    ▼
STAGE 4 — ROLE EVALUATION
/careers
    • Current stack confirmed: Next.js 15, TypeScript, Tailwind CSS, Headless WP, Vercel, AWS
    • Work style: async-first, AI-accelerated, outcome-focused
    • What's being built: agency funding a SaaS product — growth trajectory clear
    • Open roles or "how to reach out" CTA
    │
    ▼
STAGE 5 — OUTREACH
LinkedIn message or direct email (hello@driftpilot.com)
    • Recruiter has enough context to make a relevant, specific pitch
    • Founder has enough signal to evaluate fit quickly
```

**Key pages:** `/` → `/about` → `/work` → `/careers`

**What /careers must communicate to recruiters:**

| Signal | Content |
|---|---|
| Technical credibility | Full stack listed with versions (Next.js 15, TS 5.x, Tailwind 4, WPGraphQL) |
| Engineering culture | AI-native workflow explained; open-source contributions noted |
| Trajectory | Agency → SaaS roadmap with milestones; not a lifestyle freelance business |
| Work style | Async-first, outcome-oriented, small team, high autonomy |
| Openness | "Not actively hiring but always interested in exceptional engineers — reach out" |

---

## 7. Internal Linking Logic

Strong internal linking serves two purposes: SEO (distributes authority) and conversion (guides users toward `/contact`). The following rules govern link placement.

### 7.1 Mandatory Cross-Links

| From | To | Link text |
|---|---|---|
| Every service page | 1 related case study | "See how we did this for [client type] →" |
| Every case study | Related service page | Tagged service pill + inline link |
| Every insights article | 1 related service page | Contextual inline CTA |
| Every insights article | 1–2 related articles | "Related reading" block |
| /about | /work | "See the work →" |
| /about | /careers | "Working with us →" |
| /automotive | /work (automotive case study) | "See a live example →" |
| /pricing | /contact | All package CTAs |
| /how-we-work | /contact | End CTA |
| /404 | /work, /services, /contact | "You might be looking for…" |

### 7.2 Conversion Gravity Rule

Every page must have a path to `/contact` within two clicks. No page should be a dead end.

```
Dead end test: Land on page X → can you reach /contact in ≤ 2 clicks?
    ✓ /insights/[slug] → inline CTA → /contact
    ✓ /work/[slug] → "Work with us" CTA → /contact
    ✓ /about → nav CTA button → /contact
    ✗ /legal/privacy → no CTA  (acceptable exception for utility pages)
```

### 7.3 Automotive Funnel Isolation

The `/automotive` cluster should not bleed into the general agency funnel. Automotive-tagged content stays in its own pathway. Cross-links are one-way: general agency pages may reference automotive lightly (homepage signal block, footer link), but automotive pages should link forward to their own CTA (`/automotive/early-access`) rather than to `/contact`.

---

## 8. URL Schema & Metadata Notes

### 8.1 URL Conventions

| Type | Pattern | Example |
|---|---|---|
| Service pages | `/services/[kebab-slug]` | `/services/lead-generation-systems` |
| Case studies | `/work/[kebab-slug]` | `/work/hvac-company-lead-gen-rebuild` |
| Blog articles | `/insights/[kebab-slug]` | `/insights/headless-wordpress-nextjs-guide` |
| Blog tag pages | `/insights/tag/[tag]` | `/insights/tag/automotive` |
| Automotive | `/automotive/[slug]` | `/automotive/early-access` |

All URLs: lowercase, hyphens only, no trailing slash, no dates in blog slugs (prevents content decay).

### 8.2 Page Metadata Priorities

| Page | Title Tag Pattern | Meta Description Focus |
|---|---|---|
| Homepage | `Driftpilot — AI Web Development Agency` | Outcome velocity, stack, speed to launch |
| Service pages | `[Service Name] — Driftpilot` | Problem solved, deliverable, CTA |
| Case studies | `[Outcome Headline] — Driftpilot Work` | Metric, industry, service used |
| Blog articles | `[Article Title] — Driftpilot Insights` | Search intent match, value promise |
| /automotive | `Dealership Websites You Own — Driftpilot` | Ownership, performance, Driftpilot Drive |
| /careers | `Working at Driftpilot — Stack, Culture & Vision` | Stack, trajectory, contact invite |

### 8.3 Schema Markup Targets

| Page type | Schema type |
|---|---|
| Homepage | `Organization`, `WebSite` |
| Service pages | `Service`, `FAQPage` |
| Case studies | `Article`, `Review` (if client quote included) |
| Blog articles | `Article`, `BreadcrumbList` |
| Contact page | `ContactPage` |
| /about | `Person` (founder), `Organization` |

### 8.4 Sitemap.xml Groups

```xml
<!-- Priority 1.0 -->
/
/contact

<!-- Priority 0.9 -->
/services/ai-website-development
/services/headless-wordpress
/services/nextjs-development
/services/lead-generation-systems
/work
/automotive

<!-- Priority 0.8 -->
/about
/how-we-work
/pricing
/careers
/work/[all slugs]

<!-- Priority 0.7 -->
/insights/[all slugs]
/insights/tag/[all tags]

<!-- Priority 0.5 -->
/automotive/early-access
/thank-you
/privacy
/terms
```

---

*Sitemap Version 1.0 — June 2026*
*Built to support: Next.js App Router · Headless WordPress (WPGraphQL) · Vercel Edge*
*Next review: Q2 2026 after first content batch published*
