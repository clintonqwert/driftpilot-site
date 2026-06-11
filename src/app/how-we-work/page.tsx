import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { ProcessSection } from '@/components/home/ProcessSection';
import { FAQSection } from '@/components/shared/FAQSection';
import { CTABand } from '@/components/shared/CTABand';
import type { FAQItem } from '@/types/content';

export const metadata: Metadata = buildMetadata({
  title: 'How We Work — Driftpilot',
  description:
    'From first call to production in 2–4 weeks. Fixed scope, no surprises, and everything handed off to you on launch day.',
  path: '/how-we-work',
});

const principles = [
  {
    title: 'No scope creep',
    body: "We agree on exactly what's being built before a line of code is written. Change requests outside the original scope are quoted separately — always.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-brand-600">
        <path d="M9 12l2 2 4-4M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Weekly check-ins',
    body: "One short async update per week — what's shipped, what's next, any decisions needed. No email chains. No status-update meetings.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-brand-600">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'You own everything on launch day',
    body: "Code repo, CMS credentials, Vercel project, domain, analytics — all transferred to you. We don't hold infrastructure hostage.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-brand-600">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const faqItems: FAQItem[] = [
  {
    question: 'How do you keep projects from going over budget?',
    answer: "Fixed-price scope documents. Before work starts, we agree on exactly what's included. Anything outside that scope is a separate quote. No open-ended billing.",
  },
  {
    question: 'How many revision rounds are included?',
    answer: 'Two rounds of design revision before moving to build, and one round of content revisions post-build. Additional rounds are quoted at an hourly rate. Most projects never need more than two.',
  },
  {
    question: 'What does "build in production" mean?',
    answer: "We don't maintain a staging environment you never see until launch. You get a live preview URL from day three — you watch real progress, not a demo. This catches misalignments early.",
  },
  {
    question: "What's included in the 30-day support window?",
    answer: 'Bug fixes, content updates, and minor copy changes within the existing scope. Not new features or major layout changes — those are scoped separately.',
  },
  {
    question: 'Do you work with clients outside the US?',
    answer: "Yes. All client communication is async-first via Notion and Loom, which works well across time zones. We've worked with teams across North America and Europe.",
  },
];

export default function HowWeWorkPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our process"
        heading="From first call to production in 4 weeks."
        subheading="Three phases. Fixed scope. No retainer traps."
      />

      <ProcessSection />

      {/* Principles */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <h2 id="principles-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900">
              How we stay on track.
            </h2>
            <p className="mt-3 text-lg text-ink-500">
              Three rules that keep every project clean.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-ink-200 bg-white p-6 md:p-8 shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-ink-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        items={faqItems}
        heading="Process questions, answered."
        showCTA={false}
      />

      <CTABand
        headline="Ready to get started?"
        subhead={"Book a 30-minute scope call and we'll send a proposal within 48 hours.\nNo commitment required."}
        secondaryCTA={{ label: 'See Our Work', href: '/work' }}
      />
    </main>
  );
}
