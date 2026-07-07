import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@/components/shared/FAQSection";
import { CTABand } from "@/components/shared/CTABand";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildMetadata, offerCatalogSchema } from "@/lib/seo";
import { pricingFAQ } from "@/lib/content/faq/pricing";
import {
  oneTimePackages,
  monthlyPlans,
  type PricingPlan,
} from "@/lib/content/pricing";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Driftpilot",
  description: "Transparent project pricing for modern websites and lead generation systems. Flat rates, no hourly billing.",
  path: "/pricing",
});

const afterBookingSteps = [
  {
    number: "01",
    heading: "Scope call",
    body: "A free 30-minute call. We ask the right questions, align on the outcome that matters, and confirm which package fits.",
  },
  {
    number: "02",
    heading: "Fixed quote in 48 hours",
    body: "You get a scope document with a fixed price and timeline. 50% upfront, 50% on delivery — never hourly billing.",
  },
  {
    number: "03",
    heading: "Build and launch",
    body: "Most projects are live within weeks. You own the code, the content, and the leads from day one.",
  },
];

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

function PlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={`rounded-lg p-6 md:p-8 flex flex-col ${
        plan.featured
          ? "bg-raised border-2 border-accent/50 shadow-accent order-first md:order-none"
          : "bg-raised border border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-accent">
          {plan.name}
        </p>
        {plan.featured && (
          <span className="shrink-0 text-[11px] font-mono font-medium uppercase tracking-[0.1em] px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/30">
            Most popular
          </span>
        )}
        {plan.comingSoon && (
          <span className="shrink-0 text-[11px] font-mono uppercase tracking-widest bg-overlay text-muted rounded-md px-2 py-0.5">
            In development
          </span>
        )}
      </div>
      <p className="mt-4 font-mono text-4xl md:text-5xl font-semibold tabular-nums text-fg">
        {plan.price}{" "}
        <span className="text-xl font-sans font-medium text-muted">
          {plan.currency}
        </span>
      </p>
      <p className="mt-1 text-sm text-muted">{plan.paymentType}</p>
      <p className="mt-3 text-sm leading-relaxed text-fg">{plan.bestFor}</p>
      <ul className="mt-6 flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted">
            <span className="text-accent">
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>
      {plan.serviceLink && (
        <Link
          href={plan.serviceLink.href}
          className="mt-5 text-sm font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
        >
          {plan.serviceLink.label} →
        </Link>
      )}
      <Link
        href={plan.href ?? "/contact"}
        className={buttonClasses({
          variant: plan.comingSoon ? "secondary" : "primary",
          size: "md",
          className: "mt-8 w-full text-base",
        })}
      >
        {plan.cta} →
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main>
      <JsonLd schema={offerCatalogSchema([...oneTimePackages, ...monthlyPlans])} />

      {/* Page header */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="pricing-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <p className="text-[13px] font-mono font-medium uppercase tracking-[0.14em] text-accent">
            Pricing
          </p>
          <h1
            id="pricing-heading"
            className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight text-balance text-fg"
          >
            Simple, transparent pricing.
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl leading-relaxed text-muted">
            Flat rates. No hourly billing. No hidden fees. You know exactly what you&apos;re paying before we start.
          </p>
        </div>
      </section>

      {/* One-time packages */}
      <section className="bg-raised py-16 md:py-24" aria-labelledby="one-time-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2
            id="one-time-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg"
          >
            One-time packages
          </h2>
          <p className="mt-4 text-lg text-muted">Pay once. Own it completely.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-3xl">
            {oneTimePackages.map((pkg) => (
              <PlanCard key={pkg.name} plan={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Monthly plans */}
      <section className="bg-surface py-16 md:py-24" aria-labelledby="monthly-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2
            id="monthly-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg"
          >
            Monthly plans
          </h2>
          <p className="mt-4 text-lg text-muted">
            Optional add-ons — your site never requires one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {monthlyPlans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* What happens after you book */}
      <section className="bg-raised py-16 md:py-24 border-y border-line" aria-labelledby="after-booking-heading">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <h2
            id="after-booking-heading"
            className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] text-fg mb-10"
          >
            What happens after you book.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {afterBookingSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-lg border border-line bg-surface p-6 md:p-8"
              >
                <span className="font-mono text-3xl font-semibold text-accent tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{step.heading}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={pricingFAQ} showCTA={false} />

      <CTABand
        headline="Ready to get started?"
        subhead={"No contracts. No hidden fees.\nPick a plan and we'll have your site live within weeks."}
        primaryCTA={{ label: "Book a Free Scope Call", href: "/contact" }}
        secondaryCTA={{ label: "See Our Work", href: "/work" }}
      />
    </main>
  );
}
