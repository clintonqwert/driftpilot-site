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
  { label: "Insights", href: "/insights" },
  { label: "Automotive", href: "/automotive" },
];

export const PRIMARY_CTA: NavLink = {
  label: "Book a Scope Call",
  href: "/contact",
};

/** Services mega-dropdown / mobile drawer sub-items (sitemap §1.2–1.3) */
export const SERVICES_NAV: NavLink[] = [
  { label: "AI Website Development", href: "/services/ai-website-development" },
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
      { label: "AI Websites", href: "/services/ai-website-development" },
      { label: "Headless WP", href: "/services/headless-wordpress" },
      { label: "Next.js Dev", href: "/services/nextjs-development" },
      { label: "Lead Gen", href: "/services/lead-generation-systems" },
      { label: "Automotive", href: "/automotive" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Insights", href: "/insights" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
