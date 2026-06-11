import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy — Driftpilot',
  description: 'How Driftpilot collects, uses, and protects your data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        heading="Privacy Policy"
        subheading="Last updated: June 2026"
      />

      <div className="mx-auto max-w-container px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl prose prose-ink">
          <div className="flex flex-col gap-10 text-base leading-relaxed text-ink-600">

            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="text-xl font-semibold text-ink-900 mb-3">Overview</h2>
              <p>
                Driftpilot (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates driftpilot.ca. This policy explains what information we collect, how we use it, and what rights you have over it. We collect the minimum data required to respond to inquiries and improve the site. We do not sell your data.
              </p>
            </section>

            <section aria-labelledby="collect-heading">
              <h2 id="collect-heading" className="text-xl font-semibold text-ink-900 mb-3">Information we collect</h2>
              <p className="mb-3">We collect information you provide directly through our contact form:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Name and email address (required)</li>
                <li>Company name (optional)</li>
                <li>Project budget range and description</li>
              </ul>
              <p className="mt-3">
                We do not collect payment information on this site. We do not use cookies for tracking or advertising.
              </p>
            </section>

            <section aria-labelledby="analytics-heading">
              <h2 id="analytics-heading" className="text-xl font-semibold text-ink-900 mb-3">Analytics</h2>
              <p>
                We use <strong className="text-ink-800">Plausible Analytics</strong>, a privacy-first analytics provider. Plausible does not use cookies, does not collect personal data, and is fully GDPR-compliant. Page views and referrer information are aggregated and anonymous. You can learn more at{' '}
                <a href="https://plausible.io/privacy" className="text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">plausible.io/privacy</a>.
              </p>
            </section>

            <section aria-labelledby="use-heading">
              <h2 id="use-heading" className="text-xl font-semibold text-ink-900 mb-3">How we use your information</h2>
              <p className="mb-3">Information collected via the contact form is used only to:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Respond to your project inquiry</li>
                <li>Send a scope document if you request one</li>
                <li>Follow up on an active engagement</li>
              </ul>
              <p className="mt-3">
                We do not subscribe you to any mailing list, send unsolicited marketing, or share your contact information with third parties, except as required to deliver our services (e.g., forwarding a lead to a CRM tool used solely for project management).
              </p>
            </section>

            <section aria-labelledby="retention-heading">
              <h2 id="retention-heading" className="text-xl font-semibold text-ink-900 mb-3">Data retention</h2>
              <p>
                Contact form submissions are retained for up to 24 months from the date of inquiry. If you&apos;d like your information removed earlier, email us at{' '}
                <a href="mailto:hello@driftpilot.ca" className="text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline">hello@driftpilot.ca</a>{' '}
                and we&apos;ll action it within 7 business days.
              </p>
            </section>

            <section aria-labelledby="rights-heading">
              <h2 id="rights-heading" className="text-xl font-semibold text-ink-900 mb-3">Your rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, contact us at{' '}
                <a href="mailto:hello@driftpilot.ca" className="text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline">hello@driftpilot.ca</a>.
              </p>
            </section>

            <section aria-labelledby="changes-heading">
              <h2 id="changes-heading" className="text-xl font-semibold text-ink-900 mb-3">Changes to this policy</h2>
              <p>
                We may update this policy as our services evolve. Significant changes will be noted at the top of this page with a revised date. Continued use of the site after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section aria-labelledby="contact-privacy-heading">
              <h2 id="contact-privacy-heading" className="text-xl font-semibold text-ink-900 mb-3">Contact</h2>
              <p>
                Questions about this policy? Email us at{' '}
                <a href="mailto:hello@driftpilot.ca" className="text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline">hello@driftpilot.ca</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
