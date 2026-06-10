import type { Service, ServiceSlug } from "@/types/content";

/**
 * Service definitions (sitemap §2.2). Adding a service = adding an object
 * here + an FAQ file. Service routes are generated from this module.
 */
const services: Service[] = [
  {
    slug: "ai-website-development",
    name: "AI Website Development",
    title: "AI Website Development — Driftpilot",
    description:
      "AI-accelerated website builds on a modern stack — production quality in a fraction of the usual timeline.",
    excerpt: "Production-grade websites, built AI-fast.",
    primaryKeyword: "AI web development agency",
  },
  {
    slug: "headless-wordpress",
    name: "Headless WordPress",
    title: "Headless WordPress — Driftpilot",
    description:
      "Keep the WordPress editing experience your team knows, with a Next.js frontend that's fast, secure, and unhackable.",
    excerpt: "WordPress editing. Next.js performance.",
    primaryKeyword: "headless WordPress agency",
  },
  {
    slug: "nextjs-development",
    name: "Next.js Development",
    title: "Next.js Development — Driftpilot",
    description:
      "Expert Next.js builds — App Router, server components, and Core Web Vitals that pass on the first audit.",
    excerpt: "The framework powering the modern web, done right.",
    primaryKeyword: "Next.js development agency",
  },
  {
    slug: "lead-generation-systems",
    name: "Lead Generation Systems",
    title: "Lead Generation Systems — Driftpilot",
    description:
      "Websites engineered as lead engines — conversion paths, CRM integration, and measurement built in from day one.",
    excerpt: "Your website should be your best salesperson.",
    primaryKeyword: "lead generation website",
  },
];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return services.some((service) => service.slug === slug);
}
