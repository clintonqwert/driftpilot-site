import Link from 'next/link';

interface CTABandProps {
  headline?: string;
  subhead?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export function CTABand({
  headline = 'Ready to build something that converts?',
  subhead = 'Most projects are in production within 4 weeks.\nNo agency retainer. No surprise invoices.',
  primaryCTA = { label: 'Book a Free Scope Call', href: '/contact' },
  secondaryCTA = { label: 'See Our Work', href: '/work' },
}: CTABandProps) {
  return (
    <section className="bg-accent text-accent-fg py-16 md:py-20" aria-labelledby="cta-band-heading">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 id="cta-band-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-accent-fg">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-accent-fg/80 whitespace-pre-line">
            {subhead}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 h-13 px-7 w-full sm:w-auto rounded-xl bg-surface text-fg text-base font-semibold transition-colors duration-150 hover:bg-surface/85 active:bg-surface/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-fg"
            >
              {primaryCTA.label}
            </Link>
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 h-13 px-7 w-full sm:w-auto text-base font-medium text-accent-fg/80 hover:text-accent-fg transition-colors underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-fg"
            >
              {secondaryCTA.label} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
