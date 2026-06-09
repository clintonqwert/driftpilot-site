# Driftpilot — Homepage Specification
**Version 1.0 · June 2026 · Developer-Ready**

---

## Document Purpose

This specification defines every section of the Driftpilot homepage (`/`) in sufficient detail for a developer to implement without ambiguity. Each section includes goal, user psychology, messaging, CTA, layout recommendation, component structure, and interaction notes.

**Primary audience served:** Business owners (Persona A — Growth-Stage Founder, Persona B — Dealer Principal, Persona C — Marketing Manager)
**Secondary audience served:** Software recruiters
**Page goal:** Qualify visitor intent, establish credibility, and route to `/contact` or `/work` within one scroll.

---

## Global Page Constraints

| Property | Value |
|---|---|
| **Framework** | Next.js 15+ App Router |
| **Styling** | Tailwind CSS |
| **Max content width** | `1200px` |
| **Page padding (mobile)** | `px-5` (20px) |
| **Page padding (desktop)** | `px-8` (32px) |
| **Primary font** | To be defined in brand system |
| **Performance target** | Lighthouse 95+, LCP < 1.5s |
| **Scroll behaviour** | Native. No scroll-jacking. |
| **Animation** | Subtle fade-in on scroll entry (`opacity-0 → opacity-100`, `translateY(16px) → 0`). Respect `prefers-reduced-motion`. |

---

## Section Order

```
01  Navigation (sticky)
02  Hero
03  Social Proof Bar
04  Services
05  Why Driftpilot
06  Process
07  Portfolio (Case Study Highlight)
08  Automotive Signal
09  FAQ
10  Pre-Footer CTA Band
11  Footer
```

---

## 01 · Navigation

### Goal
Persist primary wayfinding and conversion CTA across the full page scroll. Never let the visitor lose the ability to book.

### Behaviour
- Sticky. `position: sticky; top: 0; z-index: 50`
- Starts transparent over hero. On scroll > 60px: applies solid background with subtle shadow.
- Transition: `background-color 200ms ease`, `box-shadow 200ms ease`

### Layout
```
┌────────────────────────────────────────────────────────────────────┐
│  [Logo]          Services ▾    Work    Insights    Automotive      │
│                                                    [Book a Scope Call] │
└────────────────────────────────────────────────────────────────────┘
```

| Element | Detail |
|---|---|
| Logo | SVG, links to `/`, `aria-label="Driftpilot home"` |
| Services | Triggers mega-dropdown (see Sitemap §1.2). Chevron rotates on open. |
| Work | `href="/work"` |
| Insights | `href="/insights"` |
| Automotive | `href="/automotive"` |
| CTA Button | `href="/contact"` · Text: `Book a Scope Call` · Solid fill, brand primary colour |

### Mobile (< 768px)
- Logo left, hamburger icon right.
- Drawer slides in from right. Full-height overlay.
- Flat nav list. CTA button pinned at bottom of drawer.

### Component: `<NavBar />`
```
Props: none (reads scroll position internally)
State: isScrolled: boolean, isMenuOpen: boolean, isServicesOpen: boolean
```

---

## 02 · Hero

### Goal
In under 5 seconds: confirm the visitor is in the right place, communicate the primary value proposition, and present one low-friction next action.

### User Psychology
The visitor arrives with one of two modes:

**Mode A — Problem-aware:** "My website doesn't work and I need someone to fix it." They need confirmation that Driftpilot solves their specific problem. Every word that doesn't do that is friction.

**Mode B — Solution-shopping:** "I know I need a Next.js agency. Who's the best fit?" They are evaluating credibility signals: stack, outcomes, how fast. Give them the concrete data first.

Both modes are served by a headline focused on measurable outcome, a subhead that names the stack and speed, and a proof stat that makes the claim credible before the visitor scrolls.

**Avoid:** Vague positioning language ("we're passionate about digital experiences"), service-first headlines ("Next.js development agency"), and anything that implies the visitor needs to scroll to understand what Driftpilot does.

### Messaging

| Element | Copy | Notes |
|---|---|---|
| **Eyebrow** | `AI-Powered Web Development` | Small caps, muted colour. Frames context before the headline lands. |
| **Headline** | `Your next website should generate leads before it finishes loading.` | Outcome-first. Implies both speed (loading) and conversion (leads). 12 words. |
| **Subhead** | `We build production-ready Next.js and headless WordPress sites in 2–4 weeks — with lead generation systems built in from day one.` | Names the stack. Names the timeline. Names the deliverable. No filler. |
| **Proof stat** | `Lighthouse 98 · LCP 0.9s · Delivered in 9 days` | Real numbers from the Driftpilot site itself. Eat your own cooking. |
| **Primary CTA** | `Book a Free Scope Call` | Links to `/contact`. Low-friction. "Free" removes commitment anxiety. |
| **Secondary CTA** | `See How We Build →` | Links to `/work`. For visitors not ready to commit — redirects to case studies. |

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   [eyebrow label]                                                   │
│                                                                     │
│   Your next website should                                          │
│   generate leads before it                                          │
│   finishes loading.                                                 │
│                                                                     │
│   We build production-ready Next.js and headless WordPress          │
│   sites in 2–4 weeks — with lead generation systems built           │
│   in from day one.                                                  │
│                                                                     │
│   [Book a Free Scope Call]   [See How We Build →]                   │
│                                                                     │
│   ── Lighthouse 98 · LCP 0.9s · Delivered in 9 days ──             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- **Desktop:** Single column, centred. Max width `720px` for text, breathing room on both sides.
- **Mobile:** Same hierarchy. Headline scales down (`text-4xl` → `text-3xl`). CTAs stack vertically.
- **Background:** Dark (near-black). Headline in white. Eyebrow and proof stat in brand accent colour. Creates instant contrast with the rest of the page.
- **No hero image or video.** The performance target is LCP < 1.5s. A full-bleed image or video is the most common cause of hero LCP failure. Trust the copy.

### Animation
- Eyebrow, headline, subhead, CTAs, proof stat: sequential fade-in on load. Stagger `100ms` between each element.
- Do not animate on scroll — this content must be visible immediately on load.

### Component: `<HeroSection />`
```
Props: none (static content)
No dynamic data fetching on this component.
LCP element: the <h1> headline tag.
```

### Accessibility
- `<h1>` on headline. Only one `<h1>` per page.
- CTA buttons: `aria-label="Book a free scope call with Driftpilot"` and `aria-label="See Driftpilot case studies"`
- Proof stat: wrapped in `<p>`, not decorative

---

## 03 · Social Proof Bar

### Goal
Immediately after the hero, interrupt scepticism with specific, real evidence. The moment between the hero and the services section is the highest scepticism point in the scroll — the visitor has just read a claim and hasn't yet seen proof. The proof bar addresses this directly.

### User Psychology
Specificity is credibility. "Clients love us" is ignored. "47% lead increase in 90 days" is not. The visitor's unconscious heuristic is: vague claim = made up, specific claim = likely real. Use real numbers. If you don't have them yet, use time stats (delivery speed) — those are easier to obtain and equally persuasive to a buyer whose last agency took 6 months.

### Messaging

Three to five static stat callouts. No carousel. No auto-scroll. Static is faster, more credible, and more readable.

| Stat | Format |
|---|---|
| `Rebuilt in 6 days.` | Client type or industry in small text below |
| `47% more leads in 90 days.` | Service type below |
| `Lighthouse 98 on every delivery.` | "Performance guarantee" below |
| `$0 in platform fees.` | "You own your infrastructure." below |
| (Optional 5th) `4 weeks average time to production.` | "Across all projects" below |

**Placeholder note for dev:** These stats will be replaced with real client data as projects complete. The layout must support swapping copy without layout changes.

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │ Rebuilt in  │  │ 47% more    │  │ Lighthouse  │  │ $0 in     │ │
│  │  6 days.    │  │ leads in    │  │  98 on every│  │ platform  │ │
│  │             │  │  90 days.   │  │  delivery.  │  │ fees.     │ │
│  │ [industry]  │  │ [service]   │  │ [guarantee] │  │ [tagline] │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

- Light background (off-white or very light grey). Separates hero from services visually.
- `padding-y: 48px`
- Stat figures: large, bold, brand accent or dark.
- Sub-labels: small, muted.
- Divider lines between stats on desktop. Removed on mobile (stacks to 2-col grid).

### Component: `<SocialProofBar />`
```
Props: stats: Array<{ figure: string, label: string }>
Rendered statically — no animation, no scroll trigger.
```

---

## 04 · Services

### Goal
Show the visitor what Driftpilot specifically does. Route them toward the service that matches their problem. Avoid overwhelming with features — one outcome sentence per service.

### User Psychology
The visitor is scanning for "is this for me?" Four service cards must each function as a mini-headline: the service name plus one sentence that names the outcome, not the process. A visitor should be able to read all four cards in 10 seconds and know exactly which one to click.

The biggest mistake agencies make here is listing *inputs* (what we do) rather than *outputs* (what you get). "We use React and TypeScript" means nothing. "A site that loads in under a second and captures leads automatically" means something.

### Messaging

| Service | Name | Outcome Sentence | Link |
|---|---|---|---|
| 1 | **AI Website Development** | Ship a production site in weeks, not months — built with AI tooling that compresses timelines without cutting corners. | `/services/ai-website-development` |
| 2 | **Headless WordPress** | Keep the CMS your team knows. Get the performance your users deserve. Next.js front end, WordPress back end. | `/services/headless-wordpress` |
| 3 | **Next.js Development** | A front end your engineers will be proud of and your users will notice. App Router, TypeScript, Vercel-deployed. | `/services/nextjs-development` |
| 4 | **Lead Generation Systems** | Your website should be your best salesperson. CRM integration, conversion-optimised pages, attribution from day one. | `/services/lead-generation-systems` |

**Section headline:** `What we build.`
**Section subhead:** `Four services. One standard: production-ready, outcome-focused, fast.`

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│   What we build.                                                    │
│   Four services. One standard: production-ready, outcome-focused.   │
│                                                                     │
│   ┌─────────────────────┐    ┌─────────────────────┐               │
│   │  AI Website Dev     │    │  Headless WordPress  │               │
│   │  [outcome sentence] │    │  [outcome sentence]  │               │
│   │  [→ Learn more]     │    │  [→ Learn more]      │               │
│   └─────────────────────┘    └─────────────────────┘               │
│   ┌─────────────────────┐    ┌─────────────────────┐               │
│   │  Next.js Dev        │    │  Lead Gen Systems    │               │
│   │  [outcome sentence] │    │  [outcome sentence]  │               │
│   │  [→ Learn more]     │    │  [→ Learn more]      │               │
│   └─────────────────────┘    └─────────────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

- **Desktop:** 2×2 grid. `gap-6`. Cards equal height.
- **Mobile:** Single column stack.
- **Card anatomy:** Service icon (optional, minimal line icon) · Service name (`<h3>`) · Outcome sentence (`<p>`) · "Learn more →" link.
- **No pricing on this section.** Pricing lives on `/pricing`. Adding it here introduces decision paralysis before trust is established.
- **Lead Generation Systems card** gets a subtle visual treatment to draw the eye — e.g. slightly higher contrast border or an "Most requested" pill. It is the highest-intent service.

### CTA
Each card has a text link: `Learn more →` pointing to the relevant service page.
Section-level CTA below grid: `Not sure which service fits? Tell us your goal →` linking to `/contact`.

### Component: `<ServicesGrid />`
```
Props: services: Array<{ name, outcome, href, icon? }>
```

---

## 05 · Why Driftpilot

### Goal
Eliminate the primary objections that prevent a qualified visitor from booking a call: "I've been burned by agencies before," "this will take forever," and "I'll just get a junior dev handed my project."

### User Psychology
At this point in the scroll, the visitor knows what Driftpilot does (services) and has seen proof that it works (social proof bar). The remaining friction is doubt — not about the category, but about whether *this specific agency* is different from every other one they've dealt with.

The differentiation section must speak to their past failure, not Driftpilot's past success. The frame is: "Here is what made every agency you've worked with frustrating. Here is why that's structurally different here." This reframes the section from self-promotion (low credibility) to problem recognition (high credibility).

Four differentiators, each with a one-sentence name and two-sentence explanation. No bullet soup.

### Messaging

**Section headline:** `Why teams come back.`
**Section subhead:** `Not because we're the cheapest. Because we're the fastest path from problem to production.`

| # | Differentiator Name | Explanation |
|---|---|---|
| 1 | **AI-native, not AI-flavoured** | Most agencies use AI to write their proposals. We use it inside the actual build — component scaffolding, copy iteration, testing — which is why we deliver in weeks, not months. The result shows up in your timeline and your Lighthouse score, not our pitch deck. |
| 2 | **We own the outcome, not just the deliverable** | The website is only half the job. We wire in the lead capture, the CRM integration, and the analytics from day one — because a site that doesn't convert is just an expensive brochure. |
| 3 | **You own your infrastructure** | No proprietary CMS you can't escape. No platform fees for data you generated. No vendor lock-in dressed up as a feature. The code, the content, the leads — they're yours the day we launch. |
| 4 | **Vertical depth, not generalist breadth** | We work with SMBs and automotive businesses because we know those problems deeply. Generalist agencies compete on aesthetics. We compete on domain knowledge — and that compounds every engagement. |

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│   Why teams come back.                                              │
│   Not because we're cheapest. Because we're the fastest path        │
│   from problem to production.                                       │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  [01]  AI-native, not AI-flavoured                           │  │
│   │        [explanation]                                         │  │
│   └──────────────────────────────────────────────────────────────┘  │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  [02]  We own the outcome, not just the deliverable          │  │
│   │        [explanation]                                         │  │
│   └──────────────────────────────────────────────────────────────┘  │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  [03]  You own your infrastructure                           │  │
│   │        [explanation]                                         │  │
│   └──────────────────────────────────────────────────────────────┘  │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  [04]  Vertical depth, not generalist breadth                │  │
│   │        [explanation]                                         │  │
│   └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

- Full-width horizontal rows, not a grid. Each row is a contained block.
- Number (`01`, `02`...) in large muted text, left-aligned. Title bold, larger. Explanation in normal weight, slightly muted.
- Alternating subtle background tint on rows (`bg-white` / `bg-slate-50`) creates visual rhythm without borders.
- On mobile: same structure, numbers above title.

### CTA
No CTA inside this section. It is a trust-building read, not a conversion moment. The next section (Process) naturally continues the momentum. Adding a CTA here interrupts before trust is fully established.

### Component: `<WhySection />`
```
Props: items: Array<{ number, title, body }>
```

---

## 06 · Process

### Goal
Eliminate the "how long does this take?" and "what actually happens?" objections. Pre-answer both before a discovery call is needed.

### User Psychology
Any visitor who has been burned by a slow agency carries timeline anxiety. "6 months and it still wasn't right" is the most common horror story in the B2B agency market. The process section does not need to be elaborate — it needs to be *specific*. Specific timelines feel credible. Vague timelines feel like every other agency.

Three phases, each with a name, a one-sentence description, and a concrete timeframe. The specificity is the point.

### Messaging

**Section headline:** `From first call to live site.`
**Section subhead:** `Three phases. No surprises. Typical project: 2–4 weeks to production.`

| Phase | Name | What Happens | Timeline |
|---|---|---|---|
| Phase 1 | **Scope** | We get on a 30-minute call, understand your goal, and send a scoping document within 48 hours. You sign off before a line of code is written. | Days 1–3 |
| Phase 2 | **Build** | We build in production from day one — no staging purgatory. You see real work in real time. Weekly check-ins. No email chains. | Days 4–21 |
| Phase 3 | **Launch & Hand Off** | QA pass, performance audit (Lighthouse 95+ required to ship), CMS training, and a 30-day support window. You leave with everything you need to own it. | Days 22–28 |

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│   From first call to live site.                                     │
│   Three phases. No surprises. Typical project: 2–4 weeks.          │
│                                                                     │
│   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐  │
│   │  Phase 01   │ ──────► │  Phase 02   │ ──────► │  Phase 03   │  │
│   │  Scope      │         │  Build      │         │  Launch     │  │
│   │  Days 1–3   │         │  Days 4–21  │         │  Days 22–28 │  │
│   │  [desc]     │         │  [desc]     │         │  [desc]     │  │
│   └─────────────┘         └─────────────┘         └─────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

- **Desktop:** Three equal columns with a connecting horizontal arrow/line between them.
- **Mobile:** Vertical stack. Arrow becomes a downward indicator between phases.
- The connecting line is decorative only — implemented with CSS `::before` pseudo-element on the row container. Do not use an SVG that requires a render-blocking resource.
- Phase number: large, muted background text behind the phase name (creates depth without clutter).
- Timeline label (`Days 1–3`) in brand accent colour — draws the eye to the thing that eliminates timeline anxiety.

### CTA
Below the three columns: `Curious about the details? See exactly how we work →` linking to `/how-we-work`.

This is a soft CTA — the visitor who wants more depth before booking gets a path. It is not the primary conversion action.

### Component: `<ProcessSection />`
```
Props: phases: Array<{ number, name, description, timeline }>
```

---

## 07 · Portfolio

### Goal
Provide concrete, specific proof that Driftpilot delivers what it claims. One featured case study on the homepage — outcome-first, with a link to the full work index.

### User Psychology
At this point in the scroll, the visitor has been told what Driftpilot does, why it's different, and how it works. The case study is the answer to: "OK but show me." It must lead with a measurable result, not a pretty screenshot.

The temptation is to showcase a beautiful design. Resist it. The visitor does not care about the aesthetics of someone else's website — they care about the business outcome. "Rebuilt in 9 days. Lead form submissions up 61%" is more persuasive than any screenshot.

The featured case study should be chosen for:
1. The most striking measurable outcome.
2. Relevance to the widest range of visitors (avoid niche verticals as the homepage feature).

### Messaging

**Section headline:** `The work.`
**Section subhead:** `Outcomes first. Technology second. Aesthetics last.`

**Featured case study card:**
```
[Client type / Industry tag]  ·  [Service tag]
Headline: "[Outcome in plain language]"
e.g. "A B2B SaaS company rebuilt their site in 9 days.
      Lead form submissions up 61% in the first month."

Two-sentence methodology summary.
Technology pills: [Next.js] [Headless WP] [HubSpot]

[Read the full case study →]
```

Below the featured card: a 2-column mini-grid of 2 additional case study thumbnails (title + outcome stat + service tag + link only — no full description).

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│   The work.                                                         │
│   Outcomes first. Technology second. Aesthetics last.               │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  [Industry tag]  ·  [Service tag]                           │   │
│   │                                                             │   │
│   │  [Outcome headline — 2 lines, large]                        │   │
│   │                                                             │   │
│   │  [Methodology — 2 sentences]                                │   │
│   │                                                             │   │
│   │  [Next.js]  [Headless WP]  [HubSpot]                       │   │
│   │                                                             │   │
│   │  Read the full case study →                                 │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│   ┌──────────────────────┐    ┌──────────────────────┐             │
│   │  [Case study 2]      │    │  [Case study 3]      │             │
│   │  [Outcome stat]      │    │  [Outcome stat]      │             │
│   │  [Tag]  →            │    │  [Tag]  →            │             │
│   └──────────────────────┘    └──────────────────────┘             │
│                                                                     │
│              [See all work →]                                       │
└─────────────────────────────────────────────────────────────────────┘
```

- Featured card: full-width, subtle border or background tint. No full-bleed image.
- Technology pills: `<span>` elements with border and small text. Not links — decorative only.
- Mini-grid cards: minimal. Outcome stat in large text, label in small text. Hover: underline on title.
- "See all work →" centred below grid, text link style.

### Placeholder state (pre-launch)
Until real case studies exist, the featured card shows a placeholder that honestly states: "Our first case studies are in progress. See how we work → `/how-we-work`." Do not fabricate outcomes.

### Component: `<PortfolioSection />`
```
Props:
  featured: { industry, service, headline, methodology, technologies, href }
  grid: Array<{ title, stat, tag, href }>
```

---

## 08 · Automotive Signal

### Goal
Without disrupting the primary agency funnel, plant a flag for automotive dealer prospects and begin capturing early access leads for Driftpilot Drive.

### User Psychology
The dealer principal (Persona B) who lands on the homepage from a cold email or referral is looking for confirmation that Driftpilot understands their world. A generic agency homepage communicates nothing specific to them. This block — small, near-footer — says: "We see you specifically. There's more coming that's built for you."

It must be small enough not to confuse SMB visitors (who aren't here for automotive) and specific enough to resonate with dealer principals (who are). The solution is a contained, visually distinct block — not a section, a band.

### Messaging

```
Headline:    Building for dealerships?
Body:        We're developing something built specifically for the automotive market —
             a platform you own, that loads fast, and sends leads to your CRM.
             Not your vendor's.
CTA:         Join the early access list →   (links to /automotive/early-access)
Sub-label:   No commitment. First to know when we launch.
```

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────────────────────────┐   │
│ │  🚗  Building for dealerships?                                │   │
│ │      We're developing something specifically for automotive.  │   │
│ │      Join the early access list →                             │   │
│ └───────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

- Full-width band. Distinct background (e.g. very dark, or brand accent colour at low opacity).
- Single line on desktop: icon · headline · body · CTA inline.
- Mobile: stacks to two lines with CTA below.
- **Not a full section.** `padding-y: 32px` max. This is a signal, not a pitch.
- Icon: a minimal automotive icon (steering wheel or similar) in SVG, inline. No image request.

### Component: `<AutomotiveBanner />`
```
Props: none (static content)
Rendered conditionally: show always for now; can be hidden via feature flag once SaaS launches
```

---

## 09 · FAQ

### Goal
Pre-answer the five objections that most commonly block a qualified lead from booking a call. Each FAQ answer should close the objection, not just acknowledge it.

### User Psychology
The visitor reading the FAQ at this point in the scroll is highly qualified. They've read through most of the page. They're not confused about what Driftpilot does — they're on the edge of reaching out and something is stopping them. The FAQ is the last wall between them and the contact form.

Common blockers at this stage:
- "I don't know if my budget is right for this."
- "I've been burned before — what makes this different?"
- "I'm not sure how long this will take."
- "What if I need changes after launch?"
- "I'm not technical — will I be able to manage this?"

Each answer should be 2–4 sentences. Specific. Direct. No hedging.

### Messaging

**Section headline:** `Questions we get before the first call.`

| # | Question | Answer |
|---|---|---|
| 1 | **What does a typical project cost?** | Most projects fall between $8,000 and $30,000 depending on scope. A 5-page marketing site with CMS and lead gen integration typically runs $8–12K. Larger builds with custom data integrations or inventory systems start at $30K. We publish our full pricing at `/pricing` — no inquiry required to see ranges. |
| 2 | **How long does it actually take?** | Most projects are in production within 2–4 weeks from signed scope. We build in production from day one — not staging — so you see real progress daily, not a big reveal at the end. The shortest we've shipped is 6 days. |
| 3 | **What if we need changes after launch?** | Every project includes a 30-day support window at no charge. After that, we offer structured retainer tiers starting at $500/month for maintenance and up to $3,000/month for ongoing development sprints. Nothing is left in a state where only we can touch it. |
| 4 | **Do we own the website after you build it?** | Completely. You own the code, the CMS, the domain, and the hosting infrastructure. We don't build on proprietary platforms or lock you into a monthly fee for tools you depend on. If you want to move on, you take everything with you. |
| 5 | **We've had bad experiences with agencies. What's different here?** | The two most common failure modes are scope creep and timeline drift — both caused by agencies that don't scope properly and don't build in public. We send a written scoping document before any work starts, we build in production so you see real progress, and we have a fixed 30-day post-launch window so there's no ambiguity about what's included. |
| 6 | **Do you work with non-technical clients?** | Yes. Most of our clients don't manage the build — they manage the outcome. We handle the technical decisions and communicate in plain language. After launch, we train you or your team on the CMS so you can make content changes without us. |

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│   Questions we get before the first call.                           │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  What does a typical project cost?                    [+]    │  │
│   └──────────────────────────────────────────────────────────────┘  │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  How long does it actually take?                      [+]    │  │
│   └──────────────────────────────────────────────────────────────┘  │
│   ... (remaining questions collapsed)                               │
└─────────────────────────────────────────────────────────────────────┘
```

- Accordion pattern. First question open by default (pricing — the most common objection first).
- `+` / `−` toggle icon, right-aligned.
- `<details>` / `<summary>` HTML elements for native accessibility. No JS required for basic function.
- Animation: `max-height` transition `200ms ease`. Respect `prefers-reduced-motion`.
- On mobile: same behaviour. Full-width touch target for each row.

### Schema
Wrap the entire FAQ section in `FAQPage` + `Question`/`Answer` schema for Google rich results.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does a typical project cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

### CTA
Below accordion: `Still have questions? Just ask.` → `[Book a 30-minute call →]` linking to `/contact`.

### Component: `<FAQSection />`
```
Props: items: Array<{ question: string, answer: string }>
Schema: inject FAQPage JSON-LD via <script type="application/ld+json">
Default open: index 0
```

---

## 10 · Pre-Footer CTA Band

### Goal
Capture every visitor who scrolled to the bottom of the page without acting. This is the last conversion opportunity before the footer utility links — make it feel like a genuine invitation, not a desperate push.

### User Psychology
A visitor at the bottom of the homepage is one of two types: (a) highly interested and still reading, or (b) mildly interested but not convinced yet. The first type just needs a frictionless on-ramp. The second needs a reason to act *now* — which is best achieved by naming a specific, low-commitment first step.

"Book a Free Scope Call" carries no commitment. It names a duration (implied 30 minutes), a cost (free), and a deliverable (a scope — something they'll get from the call). That framing converts better than "Get in touch" or "Start a project."

### Messaging

```
Headline:  Ready to build something that converts?
Subhead:   Most projects are in production within 4 weeks.
           No agency retainer. No surprise invoices.
CTA 1:     Book a Free Scope Call      → /contact   [Primary button]
CTA 2:     See Our Work →              → /work      [Text link]
```

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│           Ready to build something that converts?                   │
│           Most projects are in production within 4 weeks.           │
│           No agency retainer. No surprise invoices.                 │
│                                                                     │
│           [Book a Free Scope Call]     See Our Work →               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- Dark background (same as hero). Creates visual bookending — the page opens and closes in the same visual register.
- `padding-y: 80px` on desktop, `60px` on mobile.
- Centred. Max width `640px` for text.
- Primary CTA: full button, brand primary colour.
- Secondary CTA: text link with arrow, white/light colour.

### Component: `<CTABand />`
```
Props:
  headline: string
  subhead: string
  primaryCTA: { label, href }
  secondaryCTA: { label, href }
Reusable across other pages — same component used at bottom of service pages.
```

---

## 11 · Footer

### Goal
Provide complete navigation, legal links, contact access, and brand trust signals. The footer is a utility layer — it should not compete visually with the CTA band above it.

### Messaging

No headlines or selling in the footer. It is navigation and trust, not conversion.

| Column | Content |
|---|---|
| **Col 1 — Brand** | Driftpilot logotype · One-line tagline: "AI-powered web development for businesses that want results." · Lighthouse badge: `Lighthouse 98 · LCP 0.9s` |
| **Col 2 — Services** | AI Website Development · Headless WordPress · Next.js Development · Lead Generation Systems · For Dealerships |
| **Col 3 — Company** | Work · About · How We Work · Insights · Pricing · Careers · Privacy Policy · Terms of Service |
| **Col 4 — Get Started** | `Book a Scope Call` (button, `/contact`) · `hello@driftpilot.com` (mailto link) · LinkedIn (icon) · GitHub (icon) |

**Copyright line:** `© 2026 Driftpilot. Built with Next.js + Headless WordPress.`

### Layout

```
┌───────────────┬───────────────┬───────────────┬───────────────┐
│  [Logo]       │  SERVICES     │  COMPANY      │  GET STARTED  │
│  [tagline]    │               │               │               │
│  [badge]      │  AI Websites  │  Work         │  [CTA button] │
│               │  Headless WP  │  About        │               │
│               │  Next.js Dev  │  How We Work  │  [email]      │
│               │  Lead Gen     │  Insights     │               │
│               │  Automotive   │  Pricing      │  [LinkedIn]   │
│               │               │  Careers      │  [GitHub]     │
│               │               │               │               │
│               │               │  Privacy      │               │
│               │               │  Terms        │               │
├───────────────┴───────────────┴───────────────┴───────────────┤
│  © 2026 Driftpilot. Built with Next.js + Headless WordPress.  │
└───────────────────────────────────────────────────────────────┘
```

- Background: very dark (near-black). Matches hero / CTA band.
- `padding-y: 64px`
- Column headers: small caps, muted, letter-spaced. Not links.
- Column links: normal weight, muted white. Hover: full white.
- Copyright bar: `border-top: 1px solid rgba(255,255,255,0.1)` · `padding-top: 24px` · very small text.

### Mobile
- 2×2 grid for columns 2–4. Column 1 full-width above.
- Or: single column stack with column headers acting as expand/collapse toggles.

### Accessibility
- Footer `<nav>` with `aria-label="Footer navigation"`.
- Social icon links: `aria-label="Driftpilot on LinkedIn"` etc.
- Lighthouse badge: `aria-label="This site scores 98 on Lighthouse"`.

### Component: `<SiteFooter />`
```
Props: none (static — all links are hardcoded)
Rendered in layout.tsx, outside the page component.
```

---

## Full Section Stack Reference

```
┌─────────────────────────────────────────────────────────────────────┐
│  01  NavBar              sticky · transparent → solid on scroll     │
├─────────────────────────────────────────────────────────────────────┤
│  02  Hero                dark bg · headline · 2 CTAs · proof stat   │
├─────────────────────────────────────────────────────────────────────┤
│  03  Social Proof Bar    light bg · 4 stats · no carousel           │
├─────────────────────────────────────────────────────────────────────┤
│  04  Services            white bg · 2×2 grid · outcome sentences    │
├─────────────────────────────────────────────────────────────────────┤
│  05  Why Driftpilot      alt-row bg · 4 differentiators · no CTA    │
├─────────────────────────────────────────────────────────────────────┤
│  06  Process             white bg · 3 phases · arrow connector      │
├─────────────────────────────────────────────────────────────────────┤
│  07  Portfolio           light bg · 1 featured + 2 mini cards       │
├─────────────────────────────────────────────────────────────────────┤
│  08  Automotive Signal   accent/dark band · 1 line · soft CTA       │
├─────────────────────────────────────────────────────────────────────┤
│  09  FAQ                 white bg · accordion · FAQPage schema      │
├─────────────────────────────────────────────────────────────────────┤
│  10  Pre-Footer CTA Band dark bg · centred · 2 CTAs                 │
├─────────────────────────────────────────────────────────────────────┤
│  11  Footer              dark bg · 4 cols · copyright bar           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Registry

| Component | File path (suggested) | Reusable? |
|---|---|---|
| `<NavBar />` | `components/layout/NavBar.tsx` | Yes — all pages |
| `<HeroSection />` | `components/home/HeroSection.tsx` | No — homepage only |
| `<SocialProofBar />` | `components/home/SocialProofBar.tsx` | No — homepage only |
| `<ServicesGrid />` | `components/home/ServicesGrid.tsx` | Partial — variant on /services |
| `<WhySection />` | `components/home/WhySection.tsx` | No — homepage only |
| `<ProcessSection />` | `components/home/ProcessSection.tsx` | Yes — also on /how-we-work |
| `<PortfolioSection />` | `components/home/PortfolioSection.tsx` | Partial — variant on /work |
| `<AutomotiveBanner />` | `components/shared/AutomotiveBanner.tsx` | Yes — footer of all pages |
| `<FAQSection />` | `components/shared/FAQSection.tsx` | Yes — also on service pages |
| `<CTABand />` | `components/shared/CTABand.tsx` | Yes — bottom of all inner pages |
| `<SiteFooter />` | `components/layout/SiteFooter.tsx` | Yes — all pages |

---

## Performance Checklist

| Item | Requirement |
|---|---|
| Hero image | None. Copy-only hero eliminates LCP image penalty. |
| Fonts | Preload display font. `font-display: swap` on all web fonts. |
| Icons | SVG inline. No icon font. No separate icon image requests. |
| Analytics | Load after `DOMContentLoaded`. Do not block render. |
| Third-party scripts | Calendly, HubSpot forms: load on user interaction only (`onClick`). |
| Image format | All images (case study thumbnails): `next/image` with `WebP`, correct `sizes` prop. |
| CLS | Reserve space for all images with explicit width/height or aspect-ratio. |
| LCP target | `< 1.5s`. LCP element: `<h1>` in hero. Verify in PageSpeed Insights after deploy. |

---

## SEO Checklist

| Element | Value |
|---|---|
| `<title>` | `Driftpilot — AI Web Development Agency` |
| `<meta name="description">` | `We build production-ready Next.js and headless WordPress sites in 2–4 weeks, with lead generation systems built in from day one. Lighthouse 95+ on every delivery.` |
| `<h1>` | Hero headline (one per page) |
| `<h2>` | Each section headline (`What we build.`, `Why teams come back.`, etc.) |
| `<h3>` | Service names, case study titles, FAQ questions |
| Open Graph | `og:title`, `og:description`, `og:image` (static card, 1200×630), `og:type: website` |
| JSON-LD | `Organization` schema on homepage. `FAQPage` schema on FAQ section. |
| Canonical | `<link rel="canonical" href="https://driftpilot.com/" />` |

---

*Homepage Spec Version 1.0 — June 2026*
*Next review: After first A/B test on hero CTA copy (Q3 2026)*
