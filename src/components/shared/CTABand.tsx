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
    <section className="bg-ink-950 text-ink-300 py-16 md:py-20" aria-labelledby="cta-band-heading">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 id="cta-band-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-white">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-300 whitespace-pre-line">
            {subhead}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 h-13 px-7 w-full sm:w-auto rounded-lg bg-brand-600 text-white text-base font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 shadow-brand"
            >
              {primaryCTA.label}
            </Link>
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 h-13 px-7 w-full sm:w-auto text-base font-medium text-white/80 hover:text-white transition-colors underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              {secondaryCTA.label} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
