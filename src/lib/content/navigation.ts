/**
 * Single source of truth for nav + footer link maps (sitemap §1, §3).
 * NavBar and SiteFooter both render from these — never hardcode links.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Work", href: "/work" },
  { label: "Automotive", href: "/automotive" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const PRIMARY_CTA: NavLink = {
  label: "Book a Discovery Call",
  href: "/contact",
};

/** Services mega-dropdown / mobile drawer sub-items (sitemap §1.2–1.3) */
export const SERVICES_NAV: NavLink[] = [
  { label: "Website Development", href: "/services/ai-website-development" },
  { label: "Headless WordPress", href: "/services/headless-wordpress" },
  { label: "Next.js Development", href: "/services/nextjs-development" },
  {
    label: "Lead Generation Systems",
    href: "/services/lead-generation-systems",
  },
];

export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Website Development", href: "/services/ai-website-development" },
      { label: "Headless WordPress", href: "/services/headless-wordpress" },
      { label: "Next.js Development", href: "/services/nextjs-development" },
      { label: "Lead Generation Systems", href: "/services/lead-generation-systems" },
      { label: "For Dealerships", href: "/automotive" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Insights", href: "/insights" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
