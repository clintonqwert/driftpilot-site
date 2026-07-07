/**
 * Phase 1 pricing content — single source for the /pricing page and its
 * OfferCatalog JSON-LD. Same swap contract as the other content modules.
 */

export interface PricingPlan {
  name: string;
  /** Display price, e.g. "$1,500" — numeric value derived for schema */
  price: string;
  currency: "CAD";
  paymentType: string;
  /** One-line audience fit — descriptive, never urgent */
  bestFor: string;
  features: readonly string[];
  cta: string;
  /** Quiet link to the service behind the tier */
  serviceLink?: { label: string; href: string };
  featured?: boolean;
  /** In-development plan: CTA routes to the waitlist instead of /contact */
  comingSoon?: boolean;
  /** CTA destination — defaults to /contact */
  href?: string;
}

export const oneTimePackages: PricingPlan[] = [
  {
    name: "Website Starter",
    price: "$1,500",
    currency: "CAD",
    paymentType: "One-time payment",
    bestFor: "New businesses that need a credible, fast site without a big budget.",
    features: [
      "1–5 page responsive marketing site",
      "Contact form integration",
      "Basic SEO setup — meta, sitemap, schema",
      "Deployed and ready to launch",
      "Delivered in 1–2 weeks",
    ],
    cta: "Start with Starter",
    serviceLink: {
      label: "See the full Website Development service",
      href: "/services/ai-website-development",
    },
  },
  {
    name: "Website Growth",
    price: "$3,500",
    currency: "CAD",
    paymentType: "One-time payment",
    bestFor: "Businesses whose site must capture and qualify leads, not just exist.",
    features: [
      "Up to 10 pages with custom layout",
      "Lead generation + CRM integration",
      "Headless CMS for content updates",
      "Advanced SEO — structured data, schema",
      "30-day post-launch support window",
    ],
    cta: "Start with Growth",
    featured: true,
    serviceLink: {
      label: "See the full Lead Generation service",
      href: "/services/lead-generation-systems",
    },
  },
];

export const monthlyPlans: PricingPlan[] = [
  {
    name: "Hosting & Support",
    price: "$49",
    currency: "CAD",
    paymentType: "per month",
    bestFor: "Owners who want the site taken care of without thinking about it.",
    features: [
      "Secure modern hosting",
      "SSL certificate management",
      "Uptime monitoring",
      "Up to 1hr content updates/month",
    ],
    cta: "Get Hosting & Support",
  },
  {
    name: "Monthly Maintenance",
    price: "$99",
    currency: "CAD",
    paymentType: "per month",
    bestFor: "Active sites that need regular updates and a monthly health check.",
    features: [
      "Everything in Hosting & Support",
      "Security patches and dependency updates",
      "Up to 3hrs content updates/month",
      "Monthly performance report",
    ],
    cta: "Get Maintenance",
  },
  {
    name: "Dealership Growth Platform",
    price: "$399",
    currency: "CAD",
    paymentType: "per month",
    bestFor: "Auto dealers who want to own their site and their leads.",
    features: [
      "Inventory sync and display",
      "AI-powered lead capture",
      "CRM integration",
      "Monthly analytics and optimization",
    ],
    cta: "Join the waitlist",
    comingSoon: true,
    href: "/automotive/early-access",
    serviceLink: { label: "Learn about Driftpilot Drive", href: "/automotive" },
  },
];
