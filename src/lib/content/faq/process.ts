import type { FAQItem } from "@/types/content";

/** Process page FAQ — moved verbatim from the former /how-we-work page. */
export const processFAQ: FAQItem[] = [
  {
    question: "How do you keep projects from going over budget?",
    answer:
      "Fixed-price scope documents. Before work starts, we agree on exactly what's included. Anything outside that scope is a separate quote. No open-ended billing.",
  },
  {
    question: "How many revision rounds are included?",
    answer:
      "Two rounds of design revision before moving to build, and one round of content revisions post-build. Additional rounds are quoted at an hourly rate. Most projects never need more than two.",
  },
  {
    question: 'What does "build in production" mean?',
    answer:
      "We don't maintain a staging environment you never see until launch. You get a live preview URL from the first week — you watch real progress, not a demo. This catches misalignments early.",
  },
  {
    question: "What's included in the 30-day support window?",
    answer:
      "Bug fixes, content updates, and minor copy changes within the existing scope. Not new features or major layout changes — those are scoped separately.",
  },
  {
    question: "Do you work with clients outside the US?",
    answer:
      "Yes. All client communication is async-first via Notion and Loom, which works well across time zones. We've worked with teams across North America and Europe.",
  },
];
