import type { Service, ServiceSlug } from "@/types/content";

const services: Service[] = [
  {
    slug: "ai-website-development",
    name: "Website Development",
    title: "Website Development — Driftpilot",
    description:
      "Production-grade websites on a modern stack — shipped in weeks, not months, without cutting corners on quality.",
    excerpt: "Production-grade websites, built fast.",
    primaryKeyword: "web development agency",
    benefits: [
      "From brief to live in 4 weeks — not 4 months",
      "Next.js App Router — the modern standard, not a trend",
      "Lighthouse 95+ out of the box, not retrofitted after launch",
    ],
    deliverables: [
      "Production Next.js codebase, fully typed in TypeScript",
      "Tailwind CSS design system aligned to your brand",
      "Vercel deployment with CI/CD pipeline",
      "Handoff documentation and component guide",
      "30-day post-launch support window",
    ],
    pageFaq: [
      {
        question: "How long does a project take?",
        answer:
          "Most builds are live within 4 weeks from the scope call. Complex projects with multiple integrations or custom design work may take 6–8 weeks. We agree on a timeline before any work begins — no moving goalposts.",
      },
      {
        question: "Do I need to know how to code to work with you?",
        answer:
          "No. We handle all technical decisions and explain what matters in plain language. You review outcomes, not pull requests.",
      },
      {
        question: "What if I already have a designer?",
        answer:
          "We work well alongside existing designers. We can build from a Figma file, or design directly in the browser using your brand guidelines. Either way, the output is a production-ready codebase — not another prototype.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We include a 30-day post-launch support window. After that, you own the code outright and can host it with any Next.js-compatible provider, or hand it to an in-house team.",
      },
    ],
  },
  {
    slug: "headless-wordpress",
    name: "Headless WordPress",
    title: "Headless WordPress — Driftpilot",
    description:
      "Keep the WordPress editing experience your team knows, with a Next.js frontend that is fast, secure, and unhackable.",
    excerpt: "WordPress editing. Next.js performance.",
    primaryKeyword: "headless WordPress agency",
    benefits: [
      "Your content team keeps the CMS they already know",
      "Next.js frontend that scores Lighthouse 95+ — not the usual WordPress 40s",
      "Unhackable public frontend — the WP admin is never exposed",
    ],
    deliverables: [
      "WordPress install with ACF Pro or native block editor",
      "Next.js frontend connected via WPGraphQL",
      "CMS training session for your content team",
      "Vercel deployment with ISR for instant content updates",
      "Full TypeScript codebase with handoff documentation",
    ],
    pageFaq: [
      {
        question: "Why not just use a WordPress theme?",
        answer:
          "Themes limit your performance ceiling and lock you into the theme developer's roadmap. A headless setup gives you WordPress as a pure content tool with a custom front end that scores perfectly on Core Web Vitals — and stays fast as your content grows.",
      },
      {
        question: "Will my content team need retraining?",
        answer:
          "No. They use the same WordPress admin they already know. The only visible difference is the front end renders significantly faster.",
      },
      {
        question: "Can you migrate my existing WordPress site?",
        answer:
          "Yes. We migrate your existing content, set up the headless connection, and launch the new front end. Your URLs and SEO are preserved throughout.",
      },
      {
        question: "How does content publishing work?",
        answer:
          "When your team publishes in WordPress, the Next.js front end fetches the new content via ISR (Incremental Static Regeneration) — no manual rebuild required. Updates are live within seconds.",
      },
    ],
  },
  {
    slug: "nextjs-development",
    name: "Next.js Development",
    title: "Next.js Development — Driftpilot",
    description:
      "Expert Next.js builds — App Router, server components, and Core Web Vitals that pass on the first audit.",
    excerpt: "The framework powering the modern web, done right.",
    primaryKeyword: "Next.js development agency",
    benefits: [
      "App Router and Server Components — current standard, not legacy Pages Router",
      "Core Web Vitals that pass first audit without performance sprints",
      "TypeScript throughout — safer code, better handoffs, no runtime surprises",
    ],
    deliverables: [
      "Next.js App Router project with full TypeScript coverage",
      "Tailwind CSS styling aligned to your design system",
      "CI/CD pipeline with GitHub Actions and Vercel",
      "Lighthouse audit report and Core Web Vitals baseline",
      "Component documentation and handoff guide",
    ],
    pageFaq: [
      {
        question: "Why Next.js over plain React or other frameworks?",
        answer:
          "Next.js handles routing, server rendering, image optimisation, and deployment in one cohesive tool. Building these features separately takes weeks and introduces fragility. Next.js gives you the right defaults — and the ecosystem to back them.",
      },
      {
        question: "Do you use the Pages Router or App Router?",
        answer:
          "App Router exclusively. It is the current standard and enables React Server Components, which is where the real performance gains come from. We do not take on new projects built on the legacy Pages Router.",
      },
      {
        question: "Can you take over an existing Next.js codebase?",
        answer:
          "Yes, provided we do a code audit first. We will assess technical debt and provide a remediation plan before agreeing to ongoing work. This protects both parties.",
      },
      {
        question: "What is included in the handoff?",
        answer:
          "A documented component map, TypeScript type exports, environment variable guide, and a recorded walkthrough so your team can maintain the codebase without us.",
      },
    ],
  },
  {
    slug: "lead-generation-systems",
    name: "Lead Generation Systems",
    title: "Lead Generation Systems — Driftpilot",
    description:
      "Websites engineered as lead engines — conversion paths, CRM integration, and measurement built in from day one.",
    excerpt: "Your website should be your best salesperson.",
    primaryKeyword: "lead generation website",
    benefits: [
      "Conversion paths designed before a pixel is placed — not retrofitted",
      "CRM integration from day one — every lead routed and attributed",
      "Built-in analytics so you know what is working within 30 days",
    ],
    deliverables: [
      "Conversion-optimised landing pages (up to 5 variants)",
      "CRM-integrated intake forms with spam protection",
      "Analytics setup (Plausible or GA4) with goal tracking",
      "A/B testing baseline and measurement framework",
      "Lead routing rules and confirmation email flow",
    ],
    pageFaq: [
      {
        question: "How do you define a lead generation system?",
        answer:
          "A website designed first as a conversion tool — where every page has a clear next step, forms are friction-tested, CRM integration is wired from day one, and you can see exactly where leads come from. Most websites are not built this way. Ours are.",
      },
      {
        question: "What CRMs do you integrate with?",
        answer:
          "HubSpot, Pipedrive, Close, and any CRM with a webhook or REST API. If you are unsure which CRM to use, we will recommend one based on your sales process and team size.",
      },
      {
        question: "How long before I see results?",
        answer:
          "Results depend on your existing traffic volume. Most clients with established traffic see measurable lift within 30–60 days. We set up attribution tracking so you can see exactly what changed and why.",
      },
      {
        question: "Do you run ads?",
        answer:
          "No — we build the infrastructure that makes ads worth running. If your landing page converts at 1%, no ad spend will fix it. We build the page that converts, then your ads become efficient.",
      },
    ],
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
