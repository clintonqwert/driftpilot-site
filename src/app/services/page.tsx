import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { FAQSection } from '@/components/shared/FAQSection';
import { CTABand } from '@/components/shared/CTABand';
import Link from 'next/link';
import { PricingStrip } from '@/components/shared/PricingStrip';
import { servicesFAQ } from '@/lib/content/faq/services';
import { getAllCaseStudies } from '@/lib/content/case-studies';

export const metadata: Metadata = buildMetadata({
  title: 'Services — Driftpilot',
  description:
    'Web development, headless WordPress, Next.js builds, and lead generation systems — four services, one standard.',
  path: '/services',
});

const whyItems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M11 2v4M11 16v4M4.93 4.93l2.83 2.83M14.24 14.24l2.83 2.83M2 11h4M16 11h4M4.93 17.07l2.83-2.83M14.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
    title: "Speed-first delivery",
    body: "Most projects are live within 4 weeks. We scope tightly, build without scope creep, and deploy without drama.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M11 2L2 7l9 5 9-5-9-5zM2 17l9 5 9-5M2 12l9 5 9-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Code you keep",
    body: "Full payment means full ownership. No vendor lock-in, no licence fees. The codebase is yours on day one.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M18 20V10M14 20V4M10 20v-6M6 20v-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Outcome-first scoping",
    body: "We agree on the metric that matters before a line of code is written. If it does not move the needle, we do not build it.",
  },
];


export default async function ServicesPage() {
  const [featuredStudy] = await getAllCaseStudies();
  return (
    <main>
      <PageHero
        eyebrow="What we build"
        heading="Four services. One standard."
        subheading="Production-ready, outcome-focused, delivered in weeks."
      />

      <ServicesGrid />

      {/* Why Driftpilot */}
      <section className="bg-raised py-16 md:py-24" aria-labelledby="why-services-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-10">
            <h2
              id="why-services-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg"
            >
              Why teams choose us.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-line bg-raised p-6 md:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      {featuredStudy && (
        <section className="bg-surface py-16 md:py-24" aria-labelledby="proof-heading">
          <div className="mx-auto max-w-container px-5 md:px-8">
            <h2
              id="proof-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg mb-10"
            >
              The standard, in practice.
            </h2>
            <Link
              href={`/work/${featuredStudy.slug}`}
              className="group block rounded-lg border border-line bg-raised p-8 md:p-10 transition-all duration-200 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <p className="font-mono text-3xl md:text-4xl font-semibold text-accent tabular-nums">
                {featuredStudy.stat}
              </p>
              <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-fg max-w-2xl leading-snug group-hover:underline underline-offset-4">
                {featuredStudy.headline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted max-w-prose">
                {featuredStudy.methodology} — delivered in {featuredStudy.timeframe}.
              </p>
              <p className="mt-4 text-sm font-medium text-accent">Read the case study →</p>
            </Link>
          </div>
        </section>
      )}

      <PricingStrip />

      <FAQSection
        items={servicesFAQ}
        heading="Common questions about working together."
      />

      <CTABand />
    </main>
  );
}
