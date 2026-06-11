import Link from 'next/link';

const serviceLinks = [
  { label: 'AI Website Development', href: '/services/ai-website-development' },
  { label: 'Headless WordPress', href: '/services/headless-wordpress' },
  { label: 'Next.js Development', href: '/services/nextjs-development' },
  { label: 'Lead Generation Systems', href: '/services/lead-generation-systems' },
  { label: 'For Dealerships', href: '/automotive' },
];

const companyLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Careers', href: '/careers' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];


export function SiteFooter() {
  return (
    <footer className="bg-ink-950 text-ink-400" aria-label="Site footer">
      <div className="mx-auto max-w-container px-5 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Col 1 — Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              aria-label="Driftpilot home"
              className="text-lg font-semibold text-white tracking-tight"
            >
              Driftpilot
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink-400">
              Performance-first web development for businesses that want results.
            </p>
            <p
              className="mt-4 font-mono text-xs tabular-nums text-ink-500"
              aria-label="This site scores 98 on Lighthouse with LCP of 0.9 seconds"
            >
              Lighthouse 98 · LCP 0.9s
            </p>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p className="text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-ink-500 mb-4">
              Services
            </p>
            <nav aria-label="Footer services navigation">
              <ul className="flex flex-col gap-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Company */}
          <div>
            <p className="text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-ink-500 mb-4">
              Company
            </p>
            <nav aria-label="Footer company navigation">
              <ul className="flex flex-col gap-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4 — Get Started */}
          <div>
            <p className="text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-ink-500 mb-4">
              Get Started
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-brand-600 text-white text-sm font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Book a Scope Call
            </Link>
            <a
              href="mailto:hello@driftpilot.ca"
              className="mt-4 flex items-center gap-2 text-sm text-ink-400 hover:text-white transition-colors"
            >
              hello@driftpilot.ca
            </a>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-xs text-ink-600">
            © 2026 Driftpilot. Built with Next.js + Headless WordPress.
          </p>
        </div>
      </div>
    </footer>
  );
}
