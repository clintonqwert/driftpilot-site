import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';

export const metadata: Metadata = buildMetadata({
  title: 'About — Driftpilot',
  description:
    'Driftpilot is a performance-first web development studio building fast, conversion-focused sites for SMBs and automotive businesses.',
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
      <PageHero
        eyebrow="About Driftpilot"
        heading="We build websites that work as hard as you do."
        subheading="Performance-first, outcome-obsessed, and built on infrastructure you actually own."
      />

      {/* Founder section */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="founder-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <h2 id="founder-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-fg mb-6">
                Built by a solo founder who got tired of slow, expensive agencies.
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-muted">
                <p>
                  Driftpilot started with a simple frustration: great web development shouldn&apos;t take six months and cost a small fortune. Most agencies are structured around process, not outcomes — discovery sprints that drag, design rounds that loop, launch dates that slip.
                </p>
                <p>
                  We flipped the model. Projects start with a fixed scope document, build in production from day one, and ship with lead generation systems already wired in. Typical time from first call to production: 2–4 weeks.
                </p>
                <p>
                  We work with growth-stage founders, regional businesses, and automotive dealers — industries where website performance directly translates to revenue, and where most agencies are still guessing.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors underline-offset-4 hover:underline"
                >
                  See exactly how we work →
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

      {/* Values */}
      <section className="bg-raised py-16 md:py-24" aria-labelledby="values-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <h2 id="values-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg">
              How we think.
            </h2>
            <p className="mt-3 text-lg text-muted">
              Three principles that show up in every project.
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

      {/* Stack signal — recruiter-facing */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-8">
            <h2 id="stack-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
              How we build.
            </h2>
            <p className="mt-3 text-base text-muted">
              Every project runs on a modern, open-source stack. No proprietary tooling, no vendor lock-in.
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
            Deployed on Vercel with full TypeScript coverage, App Router architecture, and server-first rendering. Performance targets are non-negotiable: Lighthouse 95+ is required before any site ships.
          </p>
        </div>
      </section>

      <CTABand
        headline="Ready to build something that lasts?"
        subhead={"Most projects are in production within 4 weeks.\nLet's talk about yours."}
        secondaryCTA={{ label: 'See Our Work', href: '/work' }}
      />
    </main>
  );
}
