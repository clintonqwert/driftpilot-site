import type { Article } from "@/types/content";

/**
 * Phase 1 articles — /insights moves to WPGraphQL in Phase 2.
 * Same swap contract as case-studies.ts: pages only call these accessors.
 */
const articles: Article[] = [
  {
    slug: "headless-wordpress-vs-page-builder",
    title: "Why headless WordPress beats a page builder for growing businesses",
    description:
      "If you have outgrown Wix or Squarespace but are not ready for a full custom build, headless WordPress is the upgrade that does not require retraining your team.",
    topic: "Headless WordPress",
    tags: ["WordPress", "Next.js", "Performance"],
    publishedAt: "2026-05-20",
    related: [
      { label: "Our Headless WordPress service", href: "/services/headless-wordpress" },
      { label: "Next.js App Router: what it actually means for your website", href: "/insights/nextjs-app-router-what-it-means" },
      { label: "Case study: 2.1s to 0.6s LCP without changing design", href: "/work/saas-marketing-site-rebuild" },
    ],
    body: `Page builders are fast to launch. That is their job. You can have a decent-looking site in a weekend with Wix, Squarespace, or even a premium WordPress theme. For most businesses in year one, that trade-off makes sense.

The problem shows up in year two. Your team wants to add a page with a layout the builder does not support. Your developer quotes you eight hours to work around the theme. Your Lighthouse score is 48 and you are wondering why you are spending money on Google Ads for a site that loads in 4 seconds on mobile.

Headless WordPress solves this without asking your content team to learn a new tool. The back end stays WordPress — the same admin your team already knows, the same ACF fields, the same publishing workflow. What changes is the front end. Instead of a theme rendering server-side PHP, a Next.js application fetches your content via WPGraphQL and renders it as a static or server-rendered React app.

The result: Lighthouse 95+ on the first audit. Sub-second LCP. A codebase your developers can maintain without fighting a theme's CSS specificity wars. And a CMS your content team uses on day one without a training session.

The migration is less painful than you expect. Content stays in WordPress. URLs are preserved. Redirects are managed at the Next.js layer. The content team sees nothing change except that the site is noticeably faster. For businesses that have outgrown their page builder but are not ready to rebuild from scratch, headless is the upgrade path that minimises disruption and maximises performance.`,
  },
  {
    slug: "contact-form-conversion-mistakes",
    title: "The 3 contact form mistakes that are quietly killing your leads",
    description:
      "Most contact forms look fine but convert terribly. Here are the three things to fix first — and why the changes are simpler than you expect.",
    topic: "Lead Generation",
    tags: ["Conversion", "Forms", "Lead Generation"],
    publishedAt: "2026-05-10",
    featured: true,
    related: [
      { label: "Our Lead Generation Systems service", href: "/services/lead-generation-systems" },
      { label: "Case study: +47% leads in 90 days for a home services company", href: "/work/hvac-company-lead-gen-rebuild" },
      { label: "Transparent pricing for lead generation builds", href: "/pricing" },
    ],
    body: `Your contact form is probably losing you leads right now. Not because it looks broken — it probably looks fine. The problems are subtler than a broken submit button, which is why most businesses miss them.

The first mistake is asking for too much too soon. Forms with six or more fields see a measurable drop in conversion versus forms with three or four. Every additional field is a reason to abandon. The fix is to ask only for what you need to make first contact — name, email, and a sentence about their project. You can collect the rest on the call.

The second mistake is no spam protection, which leads to the wrong fix. When a form gets flooded with spam, the instinct is to add CAPTCHA. CAPTCHA adds friction for real humans and is increasingly bypassed by bots. A better solution: a honeypot field (hidden from users, filled by bots) combined with a minimum time-to-submit check. Bots fill forms instantly; humans take at least a few seconds. No CAPTCHA, no friction, significantly less spam.

The third mistake is losing field values on validation errors. A user fills out a five-field form, submits it, and gets an error because their email has a typo. If the form resets all fields on error, a significant portion of users will not re-enter everything — they will leave. The fix is to echo submitted values back so only the invalid field needs correction. This is a 20-line engineering change that can meaningfully lift form completion rates.

None of these are difficult to fix. They are just easy to overlook when the form looks fine and you have no baseline to compare against. If you are not measuring form completion rates separately from page visits, start there — the data will tell you exactly how much you are leaving behind.`,
  },
  {
    slug: "nextjs-app-router-what-it-means",
    title: "Next.js App Router: what it actually means for your website",
    description:
      "App Router is the new default in Next.js, but why does it matter if you are not a developer? Here is the short version.",
    topic: "Next.js",
    tags: ["Next.js", "Performance", "App Router"],
    publishedAt: "2026-05-01",
    related: [
      { label: "Our Next.js development service", href: "/services/nextjs-development" },
      { label: "Why headless WordPress beats a page builder", href: "/insights/headless-wordpress-vs-page-builder" },
      { label: "Case study: 0.6s LCP on a SaaS marketing site", href: "/work/saas-marketing-site-rebuild" },
    ],
    body: `If you have had a conversation with a web developer recently, you have probably heard the term App Router. It is the new way Next.js handles pages, and it became the default with Next.js 13. But what does it actually mean for a business owner or marketing lead who just wants a fast website?

The short version: App Router enables React Server Components, which means large parts of your website can be rendered on the server and sent to the browser as plain HTML — with no JavaScript required on the client side to display them. This is a meaningful performance change. Less JavaScript means faster parse times, faster interaction readiness, and better scores on Core Web Vitals like LCP (the metric Google uses most heavily in ranking signals).

The practical impact is a site that loads fast for everyone, not just people with fast connections and modern phones. A marketing page built with App Router and server components can score a Lighthouse performance of 97 or higher without any manual optimisation work. The same page built with client-side rendering typically scores 50–70 out of the box and requires a performance sprint to get close to passing.

For non-technical stakeholders, the question to ask your developer is simple: are you using the App Router with React Server Components by default, or are you using client components for pages that do not need interactivity? If it is the latter, you are leaving performance on the table — and potentially leaving ranking signals on the table too. It is worth asking before the project starts rather than after the first Lighthouse audit.`,
  },
];

export async function getAllArticles(): Promise<Article[]> {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const all = await getAllArticles();
  return all.find((article) => article.featured) ?? all[0];
}

/** Related articles ranked by shared-tag count, then recency. */
export async function getRelatedArticles(
  slug: string,
  limit = 3,
): Promise<Article[]> {
  const current = articles.find((article) => article.slug === slug);
  if (!current) return [];
  const currentTags = new Set(current.tags);
  return (await getAllArticles())
    .filter((article) => article.slug !== slug)
    .map((article) => ({
      article,
      shared: article.tags.filter((t) => currentTags.has(t)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ article }) => article);
}

export async function getAllTopics(): Promise<string[]> {
  return [...new Set(articles.map((article) => article.topic))];
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | undefined> {
  return articles.find((article) => article.slug === slug);
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  return articles.filter((article) => article.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  return [...new Set(articles.flatMap((article) => article.tags))];
}
