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

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
    </svg>
  );
}

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
              AI-powered web development for businesses that want results.
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
              href="mailto:hello@driftpilot.com"
              className="mt-4 flex items-center gap-2 text-sm text-ink-400 hover:text-white transition-colors"
            >
              hello@driftpilot.com
            </a>
            <div className="mt-5 flex gap-4">
              <a
                href="https://linkedin.com/company/driftpilot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Driftpilot on LinkedIn"
                className="text-ink-500 hover:text-white transition-colors"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/driftpilot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Driftpilot on GitHub"
                className="text-ink-500 hover:text-white transition-colors"
              >
                <GitHubIcon />
              </a>
            </div>
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
