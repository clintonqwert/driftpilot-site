import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = buildMetadata({
  title: 'Book a Scope Call — Driftpilot',
  description:
    'Tell us about your project. We reply within one business day with a scope document and next steps.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Get in touch"
        heading="Book a Free Scope Call"
        subheading="Tell us about your project. We reply within one business day."
      />

      <div className="mx-auto max-w-container px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form — takes up 3/5 on desktop */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Trust signals — 2/5 on desktop */}
          <aside className="lg:col-span-2 flex flex-col gap-8">
            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6 md:p-8">
              <h2 className="text-base font-semibold text-ink-900 mb-4">
                What happens next
              </h2>
              <ol className="flex flex-col gap-4">
                {[
                  {
                    step: '1',
                    title: 'We read your brief',
                    body: 'Every submission is reviewed by a real person — usually within a few hours.',
                  },
                  {
                    step: '2',
                    title: 'Scope document in 48 hours',
                    body: "We'll send a short scope doc outlining our understanding of the project, timeline, and budget range.",
                  },
                  {
                    step: '3',
                    title: '30-minute call (optional)',
                    body: 'If scope looks good, we hop on a quick call to align on details before any work begins.',
                  },
                  {
                    step: '4',
                    title: 'Fixed-price proposal',
                    body: 'You get a firm quote — no hourly billing, no surprise invoices — before signing anything.',
                  },
                ].map(({ step, title, body }) => (
                  <li key={step} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-brand-600 text-white text-xs font-semibold flex items-center justify-center">
                      {step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{title}</p>
                      <p className="mt-0.5 text-sm text-ink-500 leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-ink-100 bg-white p-6 md:p-8">
              <h2 className="text-base font-semibold text-ink-900 mb-3">
                Prefer email?
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed mb-3">
                Send us a note directly — no form required.
              </p>
              <a
                href="mailto:hello@driftpilot.ca"
                className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors underline-offset-2 hover:underline"
              >
                hello@driftpilot.ca
              </a>
            </div>

            <div className="flex items-start gap-3 px-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-brand-600" aria-hidden="true">
                <path d="M9 12l2 2 4-4M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-sm text-ink-500 leading-relaxed">
                No unsolicited sales calls. No newsletter sign-ups. Your information is used only to follow up on your project inquiry.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
