/**
 * Phase 1 process content — the six-step client journey rendered on /process.
 * Same swap contract as the other content modules.
 *
 * Timelines nest inside the published promise (scope doc in 48h, most
 * projects live in 2–4 weeks, 30-day support): the day ranges are an
 * editorial subdivision of those ranges, not new commitments.
 */

export interface ProcessStep {
  number: string;
  name: string;
  /** One-sentence goal of the step */
  objective: string;
  /** What the client receives; items may carry an inline link */
  deliverables: (
    | string
    | { text: string; link: { label: string; href: string }; suffix?: string }
  )[];
  /** What we need from the client / what they'll experience */
  expectations: string;
  timeline: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    name: "Discovery",
    objective:
      "Understand your business, your customers, and the single outcome the website must move.",
    deliverables: [
      "Free 30-minute discovery call",
      "Written summary of goals and constraints",
      "Honest assessment of whether we're the right fit",
    ],
    expectations:
      "Come with your goal, not a spec. A real person reads your brief within hours — no commitment at this stage.",
    timeline: "Days 1–2",
  },
  {
    number: "02",
    name: "Strategy",
    objective:
      "Turn the goal into a fixed scope: pages, integrations, the metric that defines success.",
    deliverables: [
      "Scope document within 48 hours of the call",
      "Fixed price and timeline — never hourly",
      "Sitemap and conversion-path outline",
    ],
    expectations:
      "Review and sign off before a line of code is written. Payment is 50% upfront, 50% on delivery.",
    timeline: "Days 2–3",
  },
  {
    number: "03",
    name: "Design",
    objective:
      "Shape the visual language and page layouts directly in the browser, on the production stack.",
    deliverables: [
      "Design built on the real stack — no static mockups that lie",
      "Typography, color, and component system from your brand",
      "Up to two revision rounds before build-out",
    ],
    expectations:
      "You review real pages, not pictures of pages. Design and development overlap by design — this is not a waterfall.",
    timeline: "Days 4–8",
  },
  {
    number: "04",
    name: "Development",
    objective:
      "Build every page, form, and integration in production, visible to you the entire time.",
    deliverables: [
      "Live preview URL from the first week",
      "CRM-integrated forms with spam protection",
      "SEO wiring: metadata, structured data, sitemap",
      "One short async check-in per week",
    ],
    expectations:
      "Watch real progress on the preview URL. Decisions get one consolidated question list per week — no email chains.",
    timeline: "Days 8–21",
  },
  {
    number: "05",
    name: "Launch",
    objective:
      "Ship on your domain with performance verified, and hand over everything.",
    deliverables: [
      "QA pass and Lighthouse 95+ performance audit — required to ship",
      "CMS training for your team",
      "Full handoff: code repo, credentials, analytics — you own it all",
    ],
    expectations:
      "Launch day is a transfer of ownership, not the start of a retainer. Everything runs under your accounts.",
    timeline: "Days 22–28",
  },
  {
    number: "06",
    name: "Growth",
    objective:
      "Keep the site fast, secure, and converting — at whatever level of involvement you want.",
    deliverables: [
      {
        text: "30-day support window included with every build — ",
        link: { label: "monthly plans", href: "/pricing" },
        suffix: " are optional after that",
      },
      "Hosting, maintenance, and update plans at flat monthly rates",
      "Performance and lead reporting you can act on",
    ],
    expectations:
      "Entirely optional — your site never requires an ongoing fee. Many clients run everything themselves after handoff.",
    timeline: "Ongoing",
  },
];
