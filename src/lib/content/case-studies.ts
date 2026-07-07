import type { CaseStudy } from "@/types/content";

/**
 * Phase 1 case study content — replaced by lib/cms in Phase 2.
 * THE SWAP CONTRACT: these accessors are the ONLY way pages obtain case studies.
 *
 * ARRAY ORDER IS DISPLAY ORDER (deliberate curation, not publishedAt order):
 *   [0]    featured on /work AND the home portfolio section
 *   [1-2]  home portfolio grid
 *   [3+]   /work grid only
 * Reorder to re-curate; do not sort by date.
 */
const caseStudies: CaseStudy[] = [
  {
    slug: "hvac-company-lead-gen-rebuild",
    industry: "Home Services",
    service: "lead-generation-systems",
    headline: "47% more leads in 90 days",
    methodology: "Conversion-first rebuild on Next.js",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    stat: "+47% leads",
    problem:
      "A dated, slow website that ranked but did not convert — visitors bounced before the contact form loaded. The intake form emailed a shared inbox with no routing, no attribution, and no spam filtering.",
    build:
      "Static-first rebuild with a conversion path on every service page, sub-second LCP, and CRM-integrated intake forms with automated routing by job type. Added attribution tagging so the team could see which pages drove phone calls.",
    result:
      "Lead submissions up 47% within 90 days on the same traffic. The sales team started closing 20% faster because each lead arrived pre-qualified with job type and zip code.",
    timeframe: "4 weeks",
    publishedAt: "2026-06-01",
    status:
      "The site is in production on our Monthly Maintenance plan. The office team manages seasonal service pages themselves, and every lead still routes automatically by job type — no shared inbox in sight.",
    futureDirection:
      "Next phase: dedicated landing pages for the two highest-value service lines, with A/B measurement wired into the existing attribution setup before any copy changes.",
  },
  {
    slug: "saas-marketing-site-rebuild",
    industry: "SaaS",
    service: "nextjs-development",
    headline: "2.1s to 0.6s LCP — without changing design",
    methodology: "Performance-first migration from Webflow to Next.js App Router",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    stat: "0.6s LCP",
    problem:
      "A fast-growing SaaS company was losing sign-ups on mobile — Webflow's JavaScript payload was pushing LCP past 2 seconds and the marketing team had outgrown what the CMS could do without a developer touching it.",
    build:
      "Migrated the full marketing site to Next.js App Router with React Server Components. No Webflow dependencies, no client-side hydration on static pages. Deployed to Vercel with a custom CI/CD pipeline. The content team moved to a lightweight headless CMS they could update without developer involvement.",
    result:
      "LCP dropped from 2.1s to 0.6s on mobile. Lighthouse performance score moved from 61 to 97. Trial sign-ups from organic search increased 28% in the first 60 days.",
    timeframe: "3 weeks",
    publishedAt: "2026-05-15",
    status:
      "The marketing team ships new pages through the headless CMS without developer involvement. The site remains fully static — performance has held at launch levels through every content update since.",
    futureDirection:
      "Next phase: a programmatic SEO layer for feature-comparison pages, built on the same content model so the team keeps publishing without engineering support.",
  },
  {
    slug: "dealership-website-lead-rebuild",
    industry: "Automotive",
    service: "lead-generation-systems",
    headline: "+34% lead submissions after leaving the vendor platform",
    methodology: "Owned-infrastructure rebuild off a rented dealer template",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    stat: "+34% leads",
    problem:
      "An independent dealership was paying $1,400 a month for a template website it didn't own. Mobile pages took over four seconds to load, every lead passed through the vendor's routing before reaching the sales team, and leaving the platform meant losing the site entirely.",
    build:
      "Rebuilt on Next.js under the dealership's own accounts — domain, hosting, analytics, all transferred on day one. Vehicle inquiry forms route straight to the dealership's CRM with model and trade-in tagging, so a salesperson sees the lead before any middleman does. Mobile LCP dropped from 4.2s to 0.9s.",
    result:
      "Lead form submissions rose 34% within 60 days on comparable traffic, and the monthly platform fee went to zero. The sales team now sees every inquiry the moment it arrives, tagged with the vehicle that generated it.",
    timeframe: "4 weeks",
    publishedAt: "2026-06-20",
    status:
      "In production on the dealership's own infrastructure with the Monthly Maintenance plan. The team updates inventory pages and promotions themselves, and lead attribution reports guide which models get landing-page attention.",
    futureDirection:
      "Next phase: automated inventory sync from the dealership's DMS — the same problem our Driftpilot Drive platform is being designed to solve at scale.",
  },
  {
    slug: "law-firm-conversion-rebuild",
    industry: "Professional Services",
    service: "lead-generation-systems",
    headline: "+61% qualified leads in 60 days",
    methodology: "Conversion-first rebuild with HubSpot CRM integration",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "HubSpot"],
    stat: "+61% leads",
    problem:
      "A boutique law firm was ranking on page one for several local search terms but converting at under 1%. The site had no clear call to action per practice area, a contact form that emailed a shared inbox with no routing, and no visibility into which pages generated inquiries.",
    build:
      "Rebuilt from scratch on Next.js with a dedicated conversion path on every practice area page. Integrated HubSpot for lead routing and attribution. Added a callback-request form with practice area tagging so the right attorney received each inquiry immediately.",
    result:
      "Qualified lead submissions increased 61% within 60 days on unchanged traffic. The average lead-to-consultation rate improved from 34% to 52% because better intake pre-qualification meant warmer conversations.",
    timeframe: "5 weeks",
    publishedAt: "2026-04-01",
    status:
      "In production with HubSpot routing live across all practice areas. Intake tagging still delivers each inquiry to the right attorney, and the firm reviews attribution reports monthly to decide where content effort goes.",
    futureDirection:
      "Next phase: expanding the callback-request pattern to after-hours coverage and adding practice-area landing pages for two new service lines the firm is launching.",
  },

];

/** Slug of the dealership study surfaced on /automotive — kept in sync with the entry above. */
export const DEALERSHIP_CASE_STUDY_SLUG = "dealership-website-lead-rebuild";

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | undefined> {
  return caseStudies.find((study) => study.slug === slug);
}
