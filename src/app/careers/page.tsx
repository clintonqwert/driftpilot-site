import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { CTABand } from '@/components/shared/CTABand';

export const metadata: Metadata = buildMetadata({
  title: 'Careers — Driftpilot',
  description:
    "We hire when it's the right person, not when it's convenient. See what we look for and how to reach us.",
  path: '/careers',
});

const traits = [
  {
    title: 'Strong opinions about web performance',
    body: `You've shipped sites and thought hard about why they're fast or slow. You have a point of view on Core Web Vitals, rendering strategies, and what "production-ready" actually means.`,
  },
  {
    title: 'Takes ownership',
    body: "You treat a project like it's yours — from scope to launch. You notice what's missing, flag it early, and fix it without being asked.",
  },
  {
    title: 'Ships without being told',
    body: "You don't wait for perfect information. You make a call, ship the work, and update people. Async-first, outcome-driven.",
  },
];

export default function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers"
        heading="We hire when it's the right person, not when it's convenient."
        subheading="Small team. High standards. Remote-first."
      />

      {/* Philosophy */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="philosophy-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <h2 id="philosophy-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-ink-900 mb-6">
                How we work.
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-600">
                <p>
                  Driftpilot is a solo-founded studio that operates lean by design. When we hire, it&apos;s because there&apos;s more good work than one person can take on — not because headcount is a milestone.
                </p>
                <p>
                  We work async-first. No daily standups, no status meetings. Outcomes matter more than hours. If you need a structured corporate environment to do your best work, we&apos;re probably not the right fit.
                </p>
                <p>
                  What we do care about: shipping fast, caring about quality, and being honest about tradeoffs. We build with a modern open-source stack (Next.js, TypeScript, Tailwind, Headless WordPress) and we expect the people we work with to have strong opinions about it.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6 md:p-8">
                <h3 className="text-sm font-mono font-medium uppercase tracking-[0.1em] text-ink-500 mb-4">
                  Our stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'TypeScript', 'Tailwind CSS', 'Headless WP', 'Vercel', 'React', 'WPGraphQL', 'Zod'].map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-ink-200 text-ink-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we look for */}
      <section className="bg-ink-50 py-16 md:py-24" aria-labelledby="traits-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <h2 id="traits-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900">
              What we look for.
            </h2>
            <p className="mt-3 text-lg text-ink-500">
              Less about credentials, more about how you work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {traits.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-ink-200 bg-white p-6 md:p-8 shadow-xs"
              >
                <h3 className="text-xl font-semibold tracking-tight text-ink-900 mb-3">
                  {t.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-600">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current openings */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="openings-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2 id="openings-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-ink-900 mb-8">
            Current openings
          </h2>
          <div className="max-w-2xl rounded-2xl border border-ink-200 bg-ink-50 p-6 md:p-8">
            <p className="text-base font-semibold text-ink-900 mb-2">No open roles right now.</p>
            <p className="text-base text-ink-600 leading-relaxed">
              We&apos;re heads-down building. Check back, or send a cold email with your work — if it&apos;s impressive, we&apos;ll find a way to work together.
            </p>
            <a
              href="mailto:hello@driftpilot.com"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors underline-offset-4 hover:underline"
            >
              hello@driftpilot.com →
            </a>
          </div>
        </div>
      </section>

      <CTABand
        headline="Impressive portfolio? Let's talk."
        subhead={"We're always open to meeting people who care about quality work.\nSend us your best."}
        primaryCTA={{ label: 'Send your work', href: '/contact' }}
        secondaryCTA={{ label: 'See what we build', href: '/work' }}
      />
    </main>
  );
}
