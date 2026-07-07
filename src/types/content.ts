/**
 * Content domain types — the contract everything builds against.
 *
 * Phase 1: `lib/content/*` modules satisfy these types from local TS objects.
 * Phase 2: `lib/cms/adapters.ts` maps WPGraphQL responses to these same types.
 * Components and pages only ever see these shapes (handoff doc §6).
 */

export type ServiceSlug =
  | "ai-website-development"
  | "headless-wordpress"
  | "nextjs-development"
  | "lead-generation-systems";

export interface Service {
  slug: ServiceSlug;
  name: string;
  /** Full <title> per sitemap §8.2: "[Service Name] — Driftpilot" */
  title: string;
  description: string;
  /** Short card copy for ServicesGrid */
  excerpt: string;
  /** One-line outcome statement for the services grid card */
  outcome?: string;
  primaryKeyword: string;
  /** Phase 1 page-level content — replaced by CMS fields in Phase 2 */
  benefits?: string[];
  deliverables?: string[];
  pageFaq?: FAQItem[];
}

export interface CaseStudy {
  slug: string;
  industry: string;
  service: ServiceSlug;
  /** Outcome in plain language — used as the headline and <title> */
  headline: string;
  methodology: string;
  technologies: string[];
  /** e.g. "+61% lead submissions" */
  stat: string;
  problem: string;
  build: string;
  result: string;
  timeframe: string;
  /** ISO date */
  publishedAt: string;
  /** Where the engagement stands today — qualitative, no metrics */
  status?: string;
  /** Planned next phase — phrased as plans, never as outcomes */
  futureDirection?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  /** Topic cluster per sitemap §2.4 — the category axis of the resource hub */
  topic: string;
  tags: string[];
  /** ISO date */
  publishedAt: string;
  /** Phase 1 inline body — replaced by WPGraphQL richText in Phase 2. Paragraph-separated by \n\n */
  body: string;
  /** Pinned to the hero slot of /insights (one article at a time) */
  featured?: boolean;
  /** Curated internal links rendered as a "Keep reading" block after the body */
  related?: { label: string; href: string }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
