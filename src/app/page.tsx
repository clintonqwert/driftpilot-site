import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialProofBar } from "@/components/home/SocialProofBar";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhySection } from "@/components/home/WhySection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { AutomotiveBanner } from "@/components/shared/AutomotiveBanner";
import { FAQSection } from "@/components/shared/FAQSection";
import { CTABand } from "@/components/shared/CTABand";
import {
  buildMetadata,
  organizationSchema,
  websiteSchema,
  SITE_DESCRIPTION,
} from "@/lib/seo";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { homeFAQ } from "@/lib/content/faq/home";

export const metadata: Metadata = buildMetadata({
  title: "Driftpilot — AI Web Development Agency",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default async function HomePage() {
  const allCaseStudies = await getAllCaseStudies();
  const [featured, ...rest] = allCaseStudies;
  const gridStudies = rest.slice(0, 2);

  return (
    <main>
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={websiteSchema()} />

      <HeroSection />
      <SocialProofBar />
      <ServicesGrid />
      <WhySection />
      <ProcessSection />
      <PortfolioSection featured={featured} grid={gridStudies} />
      <AutomotiveBanner />
      <FAQSection items={homeFAQ} />
      <CTABand />
    </main>
  );
}
