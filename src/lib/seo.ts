import type { Metadata } from "next";
import type { Article, FAQItem, Service } from "@/types/content";

export const SITE_NAME = "Driftpilot";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://driftpilot.com"
).replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "AI-powered web development agency. High-performance websites on Next.js and headless WordPress, built to generate leads.";

interface BuildMetadataInput {
  /** Full title — patterns per sitemap §8.2, e.g. "[Service Name] — Driftpilot" */
  title: string;
  description: string;
  /** Route path starting with "/", no trailing slash */
  path: string;
  /** Path under /og/ or absolute URL; 1200×630 */
  ogImage?: string;
}

/**
 * Canonical metadata builder used by every page (handoff doc §10).
 * Canonical URLs are absolute with no trailing slash.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: BuildMetadataInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ---------------------------------------------------------------------------
 * JSON-LD builders — render via <JsonLd schema={...} /> (components/shared).
 * ------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: "hello@driftpilot.com",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    url: `${SITE_URL}/insights/${article.slug}`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}
