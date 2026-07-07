import { buttonClasses } from '@/components/ui/button';
import { CalendlyEmbed } from '@/components/shared/CalendlyEmbed';

/**
 * Discovery-call booking band. Env-gated: when NEXT_PUBLIC_CALENDLY_URL is
 * set, a click-to-load facade swaps to the Calendly iframe on demand (the
 * third-party script payload would otherwise blow the Lighthouse budgets);
 * when unset, a zero-JS placeholder card points visitors at the form/email.
 */
export function CalendlySection() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="bg-raised py-16 md:py-24 border-y border-line" aria-labelledby="discovery-call-heading">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-2xl mb-8">
          <h2
            id="discovery-call-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg"
          >
            Prefer to talk first?
          </h2>
          <p className="mt-3 text-lg text-muted">
            Book your Discovery Call — free 30 minutes, no commitment. Pick a time that works and we&apos;ll come prepared.
          </p>
        </div>

        {url ? (
          <CalendlyEmbed url={url} />
        ) : (
          <div className="max-w-xl rounded-lg border border-line bg-surface p-6 md:p-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent mb-4">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
            <h3 className="text-lg font-semibold text-fg">Online scheduling opens soon.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              In the meantime the form above reaches us just as fast — a real person replies within one business day.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="#contact-form" className={buttonClasses({ size: 'md' })}>
                Use the form above
              </a>
              <a
                href="mailto:hello@driftpilot.ca"
                className={buttonClasses({ variant: 'ghost', size: 'md', className: 'px-0' })}
              >
                hello@driftpilot.ca →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
