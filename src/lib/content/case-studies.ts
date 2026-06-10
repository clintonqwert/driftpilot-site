import type { CaseStudy } from "@/types/content";

/**
 * Phase 1 case study content — replaced by lib/cms in Phase 2.
 *
 * THE SWAP CONTRACT (handoff doc §6): these accessors are the ONLY way pages
 * obtain case studies. They are async so Phase 2 (WPGraphQL) is a drop-in
 * implementation swap — same signatures, same return types. Never import the
 * data array directly.
 */
const caseStudies: CaseStudy[] = [
  // PLACEHOLDER — replace with real client work before launch.
  {
    slug: "hvac-company-lead-gen-rebuild",
    industry: "Home Services",
    service: "lead-generation-systems",
    headline: "47% more leads in 90 days",
    methodology: "Conversion-first rebuild on Next.js",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    stat: "+47% lead submissions",
    problem:
      "A dated, slow website that ranked but didn't convert — visitors bounced before the contact form loaded.",
    build:
      "Static-first rebuild with a conversion path on every page, sub-second LCP, and CRM-integrated intake forms.",
    result:
      "Lead submissions up 47% within 90 days of launch on the same traffic.",
    timeframe: "90 days",
    publishedAt: "2026-06-01",
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
