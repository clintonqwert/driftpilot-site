import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { buttonClasses } from '@/components/ui/button';

export const metadata: Metadata = buildMetadata({
  title: 'Dealership Websites You Own — Driftpilot Drive',
  description:
    'Driftpilot Drive: dealership websites built on infrastructure you own — fast, lead-generating, and not rented from your vendor.',
  path: '/automotive',
});

// Isolated funnel — all CTAs link to /automotive/early-access, never /contact.
const problems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-muted">
        <path d="M11 2a9 9 0 100 18A9 9 0 0011 2zM11 8v4M11 14h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
    heading: "Vendor lock-in",
    body: "Your website lives on their platform. When you leave, you lose the site, the domain history, and often the leads.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-muted">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M11 7v4l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
    heading: "Slow load times",
    body: "Most dealer sites score below 50 on Lighthouse mobile. Slow pages rank lower, convert worse, and cost more per click on paid media.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-muted">
        <path d="M3 8l8 5 8-5M3 8v8l8 5 8-5V8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Leads that bypass you",
    body: "Some vendor platforms send your leads through their own routing — meaning your data and your buyers are not entirely yours.",
  },
];

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M11 2L2 7l9 5 9-5-9-5zM2 17l9 5 9-5M2 12l9 5 9-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "You own the code",
    body: "Built on Next.js and deployed to infrastructure you control. No monthly platform fee. No vendor exit tax.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M4 17L10 11 4 5M12 19h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Sub-second load times",
    body: "Static-first architecture with global CDN delivery. Lighthouse 95+ on mobile. Your pages load before a competitor can blink.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Leads straight to your CRM",
    body: "Every inquiry is tagged, routed, and delivered directly to your team — with attribution data so you know which page converted them.",
  },
];

export default function AutomotivePage() {
  return (
    <main>
      <PageHero
        eyebrow="Driftpilot Drive"
        heading="Own your website. Own your leads."
        subheading="Most dealership websites are rented. We are building the alternative."
      />

      {/* Problem */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="problem-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-10">
            <h2
              id="problem-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg"
            >
              The current deal is not great.
            </h2>
            <p className="mt-3 text-lg text-muted">
              Most dealer website vendors share the same model. You pay monthly. They own the platform. When you stop paying, it goes away.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((item) => (
              <div
                key={item.heading}
                className="rounded-lg border border-line bg-raised p-6 md:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-raised border border-line">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-fg">{item.heading}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-raised py-16 md:py-24" aria-labelledby="solution-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-10">
            <h2
              id="solution-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg"
            >
              {"Here's what we're building."}
            </h2>
            <p className="mt-3 text-lg text-muted">
              Driftpilot Drive is a platform purpose-built for automotive dealers — designed around ownership, speed, and lead integrity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((item) => (
              <div
                key={item.heading}
                className="rounded-lg border border-line bg-raised p-6 md:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-fg">{item.heading}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early access CTA — isolated funnel, not CTABand */}
      <section className="bg-accent py-16 md:py-20" aria-labelledby="drive-cta-heading">
        <div className="mx-auto max-w-container px-5 md:px-8 text-center">
          <h2
            id="drive-cta-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-accent-fg"
          >
            Be first when we launch.
          </h2>
          <p className="mt-4 text-lg text-accent-fg/80 max-w-xl mx-auto">
            Join the early access list. No commitment, no spam — just first access to the platform and locked pricing before public launch.
          </p>
          <div className="mt-8">
            <Link
              href="/automotive/early-access"
              className={buttonClasses({ variant: 'inverse', size: 'lg', className: 'px-8' })}
            >
              Join the early access list →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
