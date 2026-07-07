import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, SITE_NAME, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { buttonClasses } from '@/components/ui/button';

export const metadata: Metadata = buildMetadata({
  title: 'Dealership Websites & Lead Generation — Driftpilot',
  description:
    'We build dealership websites and lead systems you own today — and Driftpilot Drive, a dealer platform in development. Fast, lead-generating, never rented.',
  path: '/automotive',
});

/** Current dealership offering only — Drive is in development and stays out of schema. */
const automotiveServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Dealership website development and lead generation',
  description:
    'Custom dealership websites on Next.js with CRM-integrated lead capture — owned by the dealer, not rented from a vendor.',
  url: `${SITE_URL}/automotive`,
  provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

// Isolated funnel — all CTA buttons link to /automotive/early-access, never
// /contact. Informational links to service pages are allowed.
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
    body: "Template platforms ship heavy third-party scripts on every page. Slow pages rank lower, convert worse, and cost more per click on paid media.",
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

const todayServices = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M11 2L2 7l9 5 9-5-9-5zM2 17l9 5 9-5M2 12l9 5 9-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "A dealership website you own",
    body: "A custom site on Next.js, deployed to infrastructure under your name. No monthly platform rent, no exit tax — the code and the domain history are yours from day one.",
    link: { label: "How we build websites", href: "/services/ai-website-development" },
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Lead capture wired to your CRM",
    body: "Every inquiry tagged, routed, and delivered to your team with attribution — so you know which page converted the buyer, and nobody sits between you and your leads.",
    link: { label: "How our lead systems work", href: "/services/lead-generation-systems" },
  },
];

const driveGoals = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M11 2L2 7l9 5 9-5-9-5zM2 17l9 5 9-5M2 12l9 5 9-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Ownership by design",
    body: "Drive is being designed so dealers keep the code, the content, and the leads — the same ownership standard our service builds already deliver.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M4 17L10 11 4 5M12 19h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Built to the same speed bar",
    body: "Our target for Drive is the standard we hold every delivery to today: Lighthouse 95+ and sub-second loads, with inventory pages that stay fast at scale.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="text-accent">
        <path d="M3 8l8 5 8-5M3 8v8l8 5 8-5V8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: "Inventory + CRM in one place",
    body: "The plan: inventory sync and display, lead capture, and CRM routing in a single platform — priced flat, with no per-lead fees.",
  },
];

export default function AutomotivePage() {
  return (
    <main>
      <JsonLd schema={automotiveServiceSchema} />

      <PageHero
        eyebrow="Automotive"
        heading="Own your website. Own your leads."
        subheading="We build dealership websites and lead systems today — and we're building Driftpilot Drive, a dealer platform, for tomorrow."
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
              Most dealer website vendors share the same model. You pay monthly rent. They own the platform, the templates, and often the lead routing. When you stop paying, it all goes away.
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

      {/* Available today */}
      <section className="bg-raised py-16 md:py-24" aria-labelledby="today-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-10">
            <h2
              id="today-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg"
            >
              What we can build for you today.
            </h2>
            <p className="mt-3 text-lg text-muted">
              These are not future plans — they are the same web development and lead generation services we deliver now, applied to your dealership.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {todayServices.map((item) => (
              <div
                key={item.heading}
                className="rounded-lg border border-line bg-surface p-6 md:p-8 flex flex-col"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-fg">{item.heading}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted flex-1">{item.body}</p>
                <Link
                  href={item.link.href}
                  className="mt-4 text-sm font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
                >
                  {item.link.label} →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/automotive/early-access"
              className={buttonClasses({ size: 'md' })}
            >
              Talk to us about your dealership site →
            </Link>
          </div>
        </div>
      </section>

      {/* In development: Drive */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="drive-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-accent mb-3">
              In development — early access open
            </p>
            <h2
              id="drive-heading"
              className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg"
            >
              Driftpilot Drive: what we&apos;re building next.
            </h2>
            <p className="mt-3 text-lg text-muted">
              A platform purpose-built for automotive dealers — designed around ownership, speed, and lead integrity. It is not released yet; early access members shape it with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {driveGoals.map((item) => (
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
            Be first when Drive launches.
          </h2>
          <p className="mt-4 text-lg text-accent-fg/80 max-w-xl mx-auto">
            Join the early access list. No commitment, no spam — first access to the platform, locked pricing before public launch, and a direct line to us about your dealership site in the meantime.
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
