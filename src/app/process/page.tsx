import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/shared/JsonLd';
import { PageHero } from '@/components/shared/PageHero';
import { FAQSection } from '@/components/shared/FAQSection';
import { CTABand } from '@/components/shared/CTABand';
import { PROCESS_STEPS } from '@/lib/content/process';
import { processFAQ } from '@/lib/content/faq/process';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'Our Process — Driftpilot',
  description:
    'The six-step client journey from discovery call to growth: fixed scope, build in production, live in 2–4 weeks, and you own everything at launch.',
  path: '/process',
});

const principles = [
  {
    title: 'No scope creep',
    body: "We agree on exactly what's being built before a line of code is written. Change requests outside the original scope are quoted separately — always.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <path d="M9 12l2 2 4-4M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Weekly check-ins',
    body: "One short async update per week — what's shipped, what's next, any decisions needed. No email chains. No status-update meetings.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'You own everything on launch day',
    body: "Code repo, CMS credentials, Vercel project, domain, analytics — all transferred to you. We don't hold infrastructure hostage.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 mt-1 text-accent"
    >
      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ProcessPage() {
  return (
    <main>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ])}
      />

      <PageHero
        eyebrow="Our process"
        heading="Six steps from first call to growth."
        subheading="Fixed scope, no retainer traps, most projects live in 2–4 weeks — and you can see exactly what happens at every step."
      />

      {/* Six-step timeline */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2 id="journey-heading" className="sr-only">The client journey</h2>
          {/* Rail is a ::before so the <ol> keeps only <li> children (valid HTML) */}
          <ol className="relative max-w-3xl flex flex-col gap-8 md:gap-10 before:absolute before:left-[19px] before:top-5 before:bottom-5 before:w-px before:bg-line-strong before:content-['']">
            {/* --reveal-i uses i % 2 deliberately: it caps the stagger at one
                beat — steps enter on scroll, so a full 0..5 ramp would just
                delay the lower cards. */}
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.number}
                data-reveal
                style={{ '--reveal-i': i % 2 } as React.CSSProperties}
                className="relative grid grid-cols-[40px_1fr] gap-x-5 md:gap-x-8"
              >
                {/* Marker (bg-surface masks the rail behind it) */}
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-surface border border-line-strong flex items-center justify-center font-mono text-sm font-semibold text-accent tabular-nums"
                >
                  {step.number}
                </div>

                <div className="rounded-lg border border-line bg-raised p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-fg">
                      {step.name}
                    </h3>
                    <p className="font-mono text-[13px] font-medium text-accent tracking-[0.05em]">
                      {step.timeline}
                    </p>
                  </div>

                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {step.objective}
                  </p>

                  <p className="mt-5 text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-accent">
                    What you get
                  </p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {step.deliverables.map((item) => {
                      const isLinked = typeof item !== 'string';
                      const key = isLinked ? item.text : item;
                      return (
                        <li key={key} className="flex items-start gap-2.5 text-sm leading-relaxed text-fg">
                          <CheckIcon />
                          {isLinked ? (
                            <span>
                              {item.text}
                              <Link
                                href={item.link.href}
                                className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
                              >
                                {item.link.label}
                              </Link>
                              {item.suffix}
                            </span>
                          ) : (
                            item
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <p className="mt-5 text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-muted">
                    What we need from you
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.expectations}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-raised py-16 md:py-24 border-t border-line" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-12" data-reveal>
            <h2 id="principles-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg">
              How we stay on track.
            </h2>
            <p className="mt-3 text-lg text-muted">
              Three rules that keep every project clean.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <div
                key={p.title}
                data-reveal
                style={{ '--reveal-i': i } as React.CSSProperties}
                className="rounded-lg border border-line bg-surface p-6 md:p-8"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-fg mb-2">
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        items={processFAQ}
        heading="Process questions, answered."
        showCTA={false}
      />

      <CTABand
        headline="Ready to start with a discovery call?"
        subhead={"Thirty minutes, no commitment — and a fixed-price scope document within 48 hours.\nStep one starts whenever you are."}
        primaryCTA={{ label: 'Start your project', href: '/contact' }}
        secondaryCTA={{ label: 'See Our Work', href: '/work' }}
      />
    </main>
  );
}
