import type { CaseStudy } from "@/types/content";

/**
 * Phase 1 case study content — replaced by lib/cms in Phase 2.
 * THE SWAP CONTRACT: these accessors are the ONLY way pages obtain case studies.
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
  },
];

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | undefined> {
  return caseStudies.find((study) => study.slug === slug);
}
