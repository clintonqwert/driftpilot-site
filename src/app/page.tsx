import type { Metadata } from "next";
import { buildMetadata, organizationSchema, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Driftpilot — AI Web Development Agency",
  description: SITE_DESCRIPTION,
  path: "/",
});

// Placeholder page — composed from section components per the homepage spec
// during the build phase (Hero, SocialProofBar, ServicesGrid, WhySection,
// ProcessSection, PortfolioSection, AutomotiveBanner, FAQSection, CTABand).
export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
        Driftpilot
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        AI-powered web development for businesses that want results.
      </p>
    </main>
  );
}
