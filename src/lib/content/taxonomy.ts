import type { ServiceSlug } from "@/types/content";

/**
 * Single source for the topic ↔ tag ↔ service relations the pages
 * cross-link by (insights index chips, article CTAs, service detail
 * related-reading). Was previously three hardcoded maps in three pages.
 */
interface TopicEntry {
  /** Tag page that best represents the topic */
  tag: string;
  /** Service the topic ultimately supports */
  service: ServiceSlug;
}

const TOPICS: Record<string, TopicEntry> = {
  "Headless WordPress": { tag: "WordPress", service: "headless-wordpress" },
  "Lead Generation": { tag: "Lead Generation", service: "lead-generation-systems" },
  "Next.js": { tag: "Next.js", service: "nextjs-development" },
};

/** Tag whose articles are most relevant to a service (inverse relation). */
export const SERVICE_TAG: Record<ServiceSlug, string> = {
  "ai-website-development": "Next.js",
  "headless-wordpress": "WordPress",
  "nextjs-development": "Next.js",
  "lead-generation-systems": "Lead Generation",
};

/** Tag page for a topic — undefined for unmapped topics (callers must skip, not guess). */
export function topicTag(topic: string): string | undefined {
  return TOPICS[topic]?.tag;
}

/** Service behind a topic — undefined for unmapped topics. */
export function topicService(topic: string): ServiceSlug | undefined {
  return TOPICS[topic]?.service;
}
