import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, buildMetadata, organizationSchema } from '@/lib/seo';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';
import { buttonClasses } from '@/components/ui/button';

export const metadata: Metadata = buildMetadata({
  title: 'About — Driftpilot',
  description:
    'Why Driftpilot exists: performance-grade web development for business owners who need their website to generate revenue — fixed scope, 2–4 week delivery, and you own everything.',
  path: '/about',
});

const values = [
  {
    title: 'Own the outcome',
    body: "The website is only half the job. We wire in lead capture, CRM integration, and analytics from day one — because a site that doesn't convert is just an expensive brochure.",
  },
  {
    title: 'You own the code',
    body: "No proprietary CMS you can't escape. No platform fees for data you generated. The code, the content, the leads — they're yours the day we launch.",
  },
  {
    title: 'Vertical depth',
    body: 'We work with SMBs and automotive businesses because we know those problems deeply. Domain knowledge compounds every engagement.',
  },
];

const stack = [
  'Next.js', 'TypeScript', 'Tailwind CSS',
  'Headless WordPress', 'Vercel', 'App Router',
  'React Server Components', 'WPGraphQL',
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd schema={organizationSchema()} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <PageHero
        eyebrow="About Driftpilot"
        heading="We build websites that work as hard as you do."
        subheading="Performance-first, outcome-obsessed, and built on infrastructure you actually own."
      />

      {/* Why Driftpilot exists */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="why-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <h2 id="why-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-fg mb-6">
                Most business websites are built to be delivered, not to perform.
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-muted">
                <p>
                  Driftpilot exists because of a pattern we kept seeing: businesses paying agency prices for websites that took six months to ship, loaded slowly, and generated nothing. Most agencies are structured around process, not outcomes — discovery sprints that drag, design rounds that loop, launch dates that slip, and an invoice for every conversation.
                </p>
                <p>
                  We flipped the model. Every project starts with a fixed-scope document you approve before a line of code is written, builds in production where you can watch it take shape, and ships with lead generation wired in. Typical time from first call to production: 2–4 weeks.
                </p>
                <p>
                  We work with growth-stage founders, regional businesses, and automotive dealers — industries where website performance directly translates to revenue, and where most agencies are still guessing.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/process"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors underline-offset-4 hover:underline"
                >
                  See our full process →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="rounded-lg border border-line bg-raised p-6 md:p-8">
                <p className="font-mono text-4xl font-semibold text-fg tabular-nums">98</p>
                <p className="mt-1 text-sm text-muted">Lighthouse score — this site</p>
              </div>
              <div className="rounded-lg border border-line bg-raised p-6 md:p-8">
                <p className="font-mono text-4xl font-semibold text-fg tabular-nums">0.9s</p>
                <p className="mt-1 text-sm text-muted">LCP — largest contentful paint</p>
              </div>
              <div className="rounded-lg border border-line bg-raised p-6 md:p-8">
                <p className="font-mono text-4xl font-semibold text-fg tabular-nums">9 days</p>
                <p className="mt-1 text-sm text-muted">Delivery time for this site</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & philosophy */}
      <section className="bg-raised py-16 md:py-24" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <h2 id="mission-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg">
              Our mission is simple.
            </h2>
            <p className="mt-3 text-lg text-muted">
              Make performance-grade web development accessible to businesses that can&apos;t afford agency waste. Every principle below exists to serve that — and each one shows up in every project we take on.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-surface rounded-lg border border-line p-6 md:p-8"
              >
                <h3 className="text-xl font-semibold tracking-tight text-fg mb-3">
                  {v.title}
                </h3>
                <p className="text-base leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we build software */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-8">
            <h2 id="stack-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
              How we build software.
            </h2>
            <p className="mt-3 text-base text-muted">
              The stack below is not a badge wall — it&apos;s why your project ships in weeks instead of months, why nothing locks you in, and why the site is still fast a year after launch. Modern, open-source, and fully yours at handoff.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm font-medium px-3 py-1.5 rounded-lg bg-raised border border-line text-fg"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted max-w-prose">
            Deployed on Vercel with full TypeScript coverage, App Router architecture, and server-first rendering. Performance targets are non-negotiable: Lighthouse 95+ is required before any site ships. See what that looks like across{' '}
            <Link href="/services" className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors">
              our services
            </Link>{' '}
            and{' '}
            <Link href="/work" className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors">
              our work
            </Link>.
          </p>
        </div>
      </section>

      {/* Why modern websites matter */}
      <section className="bg-raised py-16 md:py-24 border-y border-line" aria-labelledby="matter-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl">
            <h2 id="matter-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg">
              Why a modern website matters.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted">
              <p>
                Your website is usually the first — and often the only — chance to convert a prospect who found you. Every second of load time is a filter: slower pages rank lower on Google, burn paid-ad budget on visitors who leave before the page paints, and quietly hand leads to whoever loads faster.
              </p>
              <p>
                A modern build turns that filter into an advantage. Server-rendered pages that paint in under a second, forms that route leads straight into your CRM with attribution, and structured data that tells search engines exactly what you sell. That is the difference between a brochure and a salesperson — and it&apos;s measurable within the first month.
              </p>
            </div>
          </div>

          {/* Mid-page CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/contact" className={buttonClasses({ size: 'md' })}>
              Meet with Driftpilot →
            </Link>
            <Link
              href="/pricing"
              className={buttonClasses({ variant: 'ghost', size: 'md', className: 'px-0' })}
            >
              See transparent pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Long-term vision */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="vision-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl">
            <h2 id="vision-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-fg mb-6">
              Where this is going.
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted">
              <p>
                We&apos;re going deeper, not wider. The next phase of Driftpilot is vertical depth: purpose-built platforms for the industries we know best, starting with{' '}
                <Link href="/automotive" className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors">
                  Driftpilot Drive for automotive dealers
                </Link>{' '}
                — currently in development with early access open.
              </p>
              <p>
                Along the way we publish what we learn in{' '}
                <Link href="/insights" className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors">
                  Insights
                </Link>{' '}
                — the same thinking we apply to client work, free to anyone building for the web.
              </p>
              <p>
                What won&apos;t change: we stay small, we stay accountable to outcomes, and every client keeps owning everything we build for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build something that lasts?"
        subhead={"Most projects are in production within 4 weeks.\nLet's talk about yours."}
        primaryCTA={{ label: 'Meet with Driftpilot', href: '/contact' }}
        secondaryCTA={{ label: 'See Our Work', href: '/work' }}
      />
    </main>
  );
}
