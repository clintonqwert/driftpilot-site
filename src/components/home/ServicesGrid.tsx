import Link from 'next/link';

const services = [
  {
    name: 'AI Website Development',
    outcome: 'Ship a production site in weeks, not months — using modern tooling that compresses timelines without cutting corners.',
    href: '/services/ai-website-development',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Headless WordPress',
    outcome: 'Keep the CMS your team knows. Get the performance your users deserve. Next.js front end, WordPress back end.',
    href: '/services/headless-wordpress',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Next.js Development',
    outcome: 'A front end your engineers will be proud of and your users will notice. App Router, TypeScript, Vercel-deployed.',
    href: '/services/nextjs-development',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <path d="M4 17L10 11 4 5M12 19h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Lead Generation Systems',
    outcome: 'Your website should be your best salesperson. CRM integration, conversion-optimised pages, attribution from day one.',
    href: '/services/lead-generation-systems',
    featured: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-surface py-16 md:py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="max-w-2xl" data-reveal>
          <h2 id="services-heading" className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg">
            What we build.
          </h2>
          <p className="mt-3 text-lg text-muted">
            Four services. One standard: production-ready, outcome-focused, fast.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.href}
              href={service.href}
              data-reveal
              style={{ "--reveal-i": i % 2 } as React.CSSProperties}
              className={`group block rounded-lg p-6 md:p-8 border transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                service.featured
                  ? 'bg-raised border-accent/30 hover:border-accent/60'
                  : 'bg-raised border-line hover:border-line-strong'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-0.5 shrink-0 rounded-lg p-2 ${service.featured ? 'bg-accent/10' : 'bg-overlay'}`}>
                  {service.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-semibold tracking-tight text-fg">
                      {service.name}
                    </h3>
                    {service.featured && (
                      <span className="text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/30">
                        Most requested
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {service.outcome}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-hover transition-colors">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="text-sm font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
          >
            Not sure which service fits? Tell us your goal →
          </Link>
        </div>
      </div>
    </section>
  );
}
