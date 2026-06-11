import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@/components/shared/FAQSection";
import { CTABand } from "@/components/shared/CTABand";
import { buildMetadata } from "@/lib/seo";
import { pricingFAQ } from "@/lib/content/faq/pricing";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Driftpilot",
  description: "Transparent project pricing for modern websites and lead generation systems. Flat rates, no hourly billing.",
  path: "/pricing",
});

const oneTimePackages = [
  {
    name: "Website Starter",
    price: "$1,500",
    currency: "CAD",
    paymentType: "One-time payment",
    featured: false,
    features: [
      "1–5 page responsive marketing site",
      "Contact form integration",
      "Basic SEO setup — meta, sitemap, schema",
      "Deployed and ready to launch",
      "Delivered in 1–2 weeks",
    ],
    cta: "Get started",
  },
  {
    name: "Website Growth",
    price: "$3,500",
    currency: "CAD",
    paymentType: "One-time payment",
    featured: true,
    features: [
      "Up to 10 pages with custom layout",
      "Lead generation + CRM integration",
      "Headless CMS for content updates",
      "Advanced SEO — structured data, schema",
      "30-day post-launch support window",
    ],
    cta: "Get started",
  },
] as const;

const monthlyPlans = [
  {
    name: "Hosting & Support",
    price: "$49",
    currency: "CAD",
    paymentType: "per month",
    comingSoon: false,
    features: [
      "Secure modern hosting",
      "SSL certificate management",
      "Uptime monitoring",
      "Up to 1hr content updates/month",
    ],
    cta: "Get started",
  },
  {
    name: "Monthly Maintenance",
    price: "$99",
    currency: "CAD",
    paymentType: "per month",
    comingSoon: false,
    features: [
      "Everything in Hosting & Support",
      "Security patches and dependency updates",
      "Up to 3hrs content updates/month",
      "Monthly performance report",
    ],
    cta: "Get started",
  },
  {
    name: "Dealership Growth Platform",
    price: "$399",
    currency: "CAD",
    paymentType: "per month",
    comingSoon: true,
    features: [
      "Inventory sync and display",
      "AI-powered lead capture",
      "CRM integration",
      "Monthly analytics and optimization",
    ],
    cta: "Join the waitlist",
  },
] as const;

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="shrink-0 mt-0.5"
  >
    <path
      d="M3 8l3.5 3.5L13 4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PricingPage() {
  return (
    <main>
      {/* Page header */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="pricing-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-600">
            Pricing
          </p>
          <h1
            id="pricing-heading"
            className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-balance text-ink-900"
          >
            Simple, transparent pricing.
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-600">
            Flat rates. No hourly billing. No hidden fees. You know exactly what you&apos;re paying before we start.
          </p>
        </div>
      </section>

      {/* One-time packages */}
      <section className="bg-ink-50 py-16 md:py-24" aria-labelledby="one-time-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2
            id="one-time-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900"
          >
            One-time packages
          </h2>
          <p className="mt-4 text-lg text-ink-600">Pay once. Own it completely.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-3xl">
            {oneTimePackages.map((pkg) =>
              pkg.featured ? (
                <div
                  key={pkg.name}
                  className="rounded-2xl p-6 md:p-8 bg-ink-950 border border-ink-800 shadow-lg flex flex-col"
                >
                  <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-400">
                    {pkg.name}
                  </p>
                  <p className="mt-4 font-mono text-4xl md:text-5xl font-semibold tabular-nums text-white">
                    {pkg.price}{" "}
                    <span className="text-xl font-sans font-medium text-ink-400">
                      {pkg.currency}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-ink-400">{pkg.paymentType}</p>
                  <ul className="mt-6 flex flex-col gap-3 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink-300">
                        <span className="text-brand-400">
                          <CheckIcon />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-6 w-full rounded-lg bg-brand-600 text-white text-base font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 shadow-brand"
                  >
                    {pkg.cta} →
                  </Link>
                </div>
              ) : (
                <div
                  key={pkg.name}
                  className="rounded-2xl p-6 md:p-8 bg-white border border-ink-200 shadow-xs flex flex-col"
                >
                  <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-600">
                    {pkg.name}
                  </p>
                  <p className="mt-4 font-mono text-4xl md:text-5xl font-semibold tabular-nums text-ink-900">
                    {pkg.price}{" "}
                    <span className="text-xl font-sans font-medium text-ink-400">
                      {pkg.currency}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-ink-500">{pkg.paymentType}</p>
                  <ul className="mt-6 flex flex-col gap-3 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink-600">
                        <span className="text-brand-600">
                          <CheckIcon />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-6 w-full rounded-lg bg-brand-600 text-white text-base font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                  >
                    {pkg.cta} →
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Monthly plans */}
      <section className="bg-white py-16 md:py-24" aria-labelledby="monthly-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2
            id="monthly-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-ink-900"
          >
            Monthly plans
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Ongoing support and growth, month by month.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {monthlyPlans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-6 md:p-8 bg-white border border-ink-200 shadow-xs flex flex-col"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-brand-600">
                    {plan.name}
                  </p>
                  {plan.comingSoon && (
                    <span className="shrink-0 text-[11px] font-mono uppercase tracking-widest bg-ink-100 text-ink-400 rounded-md px-2 py-0.5">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="mt-4 font-mono text-4xl md:text-5xl font-semibold tabular-nums text-ink-900">
                  {plan.price}{" "}
                  <span className="text-xl font-sans font-medium text-ink-400">
                    {plan.currency}
                  </span>
                </p>
                <p className="mt-1 text-sm text-ink-500">{plan.paymentType}</p>
                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-600">
                      <span className="text-brand-600">
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.comingSoon ? (
                  <button
                    type="button"
                    aria-disabled="true"
                    className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-6 w-full rounded-lg bg-ink-100 text-ink-400 text-base font-semibold cursor-not-allowed select-none"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-6 w-full rounded-lg bg-brand-600 text-white text-base font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                  >
                    {plan.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={pricingFAQ} />

      <CTABand
        headline="Ready to get started?"
        subhead={"No contracts. No hidden fees.\nPick a plan and we'll have your site live within weeks."}
        primaryCTA={{ label: "Book a Free Scope Call", href: "/contact" }}
        secondaryCTA={{ label: "See Our Work", href: "/work" }}
      />
    </main>
  );
}
