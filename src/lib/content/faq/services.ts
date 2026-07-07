import type { FAQItem } from "@/types/content";
import { paymentTermsFAQ } from "./shared";

/** Services index FAQ — same module pattern as faq/pricing.ts. */
export const servicesFAQ: FAQItem[] = [
  {
    question: "Can I work with you if I already have a designer?",
    answer:
      "Yes. We work from Figma files, brand guidelines, or design systems you already have. If you do not have a designer, we design directly in the browser using your brand assets.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects are live within 4 weeks from the discovery call. Complex builds with multiple integrations or bespoke design may take 6–8 weeks. We agree on a timeline before any work begins.",
  },
  paymentTermsFAQ,
  {
    question: "How many revision rounds are included?",
    answer:
      "Each project scope includes a defined number of revision rounds, typically two. Requests outside the agreed scope are quoted separately before any additional work is undertaken.",
  },
  {
    question: "How do I start?",
    answer:
      "Book a free 30-minute discovery call. We will ask the right questions, understand your goal, and come back with a fixed quote and timeline. No commitment until you approve the scope.",
  },
];
