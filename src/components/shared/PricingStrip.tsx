import Link from 'next/link';

/** Single-row band pointing at the published pricing — used on services surfaces. */
export function PricingStrip() {
  return (
    <section className="bg-surface border-y border-line" aria-label="Pricing summary">
      <div className="mx-auto max-w-container px-5 md:px-8 py-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div>
          <p className="text-base font-semibold text-fg">
            Fixed pricing, published openly.
          </p>
          <p className="mt-1 text-sm text-muted">
            Projects from $1,500 CAD — no hourly billing, no hidden fees.
          </p>
        </div>
        <Link
          href="/pricing"
          className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
        >
          See all pricing →
        </Link>
      </div>
    </section>
  );
}
