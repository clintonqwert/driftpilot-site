import type { FAQItem } from "@/types/content";

/**
 * Homepage FAQ (homepage spec). One file per surface — service-page FAQ
 * files (lead-generation.ts, headless-wordpress.ts, nextjs.ts,
 * ai-development.ts, automotive.ts) are added with their page builds.
 */
export const homeFAQ: FAQItem[] = [
  // PLACEHOLDER — final copy comes from the homepage spec during the build phase.
  {
    question: "How fast can you launch a website?",
    answer:
      "Most projects launch in 2–4 weeks. AI-assisted development compresses build time without compressing quality — every site still ships with full QA, accessibility, and performance budgets met.",
  },
  {
    question: "What stack do you build on?",
    answer:
      "Next.js, TypeScript, and Tailwind CSS, deployed on Vercel. For content-heavy sites we add headless WordPress so your team keeps a familiar editor.",
  },
  {
    question: "Do you only build websites?",
    answer:
      "Websites are the core, but every build is a lead generation system: conversion paths, CRM integration, and analytics are part of the deliverable, not add-ons.",
  },
];
