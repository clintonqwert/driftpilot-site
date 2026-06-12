import type { MetadataRoute } from "next";
import { getAllArticles, getAllTags } from "@/lib/content/articles";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { getAllServices } from "@/lib/content/services";
import { SITE_URL } from "@/lib/seo";

/**
 * Generated from the same content accessors pages use, so Phase 2 CMS
 * content appears automatically. Priorities per sitemap doc §8.4.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, caseStudies, articles, tags] = await Promise.all([
    Promise.resolve(getAllServices()),
    getAllCaseStudies(),
    getAllArticles(),
    getAllTags(),
  ]);

  const entry = (
    path: string,
    priority: number,
    lastModified?: string | Date,
  ): MetadataRoute.Sitemap[number] => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    ...(lastModified ? { lastModified } : {}),
    priority,
  });

  return [
    entry("/", 1.0),
    entry("/contact", 1.0),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/services", 0.9),
    entry("/work", 0.9),
    entry("/automotive", 0.9),
    entry("/about", 0.8),
    entry("/how-we-work", 0.8),
    entry("/pricing", 0.8),
    entry("/careers", 0.8),
    ...caseStudies.map((c) => entry(`/work/${c.slug}`, 0.8, c.publishedAt)),
    entry("/insights", 0.7),
    ...articles.map((a) => entry(`/insights/${a.slug}`, 0.7, a.publishedAt)),
    ...tags.map((t) => entry(`/insights/tag/${t}`, 0.7)),
    entry("/privacy", 0.5),
    entry("/terms", 0.5),
  ];
}
