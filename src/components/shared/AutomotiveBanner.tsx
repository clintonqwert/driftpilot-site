import Link from 'next/link';
import { buttonClasses } from '@/components/ui/button';

function SteeringWheelIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-accent"
    >
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.75"/>
      <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M11 8V3M7.05 13.05L3.5 16.5M14.95 13.05l3.55 3.45" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  );
}

export function AutomotiveBanner() {
  return (
    <section className="bg-surface border-t border-line py-8" aria-label="Automotive dealership signal">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <SteeringWheelIcon />
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-fg">
              Building for dealerships?
            </p>
            <p className="mt-0.5 text-sm text-muted">
              We&apos;re developing something built specifically for the automotive market — a platform you own, that loads fast, and sends leads to your CRM. Not your vendor&apos;s.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            <Link
              href="/automotive/early-access"
              className={buttonClasses({ size: 'sm', className: 'whitespace-nowrap' })}
            >
              Join the early access list →
            </Link>
            <p className="text-[11px] text-muted/70 text-center md:text-right">
              No commitment. First to know when we launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
