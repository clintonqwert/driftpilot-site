'use client';

import { useState } from 'react';
import { buttonClasses } from '@/components/ui/button';

/**
 * Click-to-load facade for the Calendly scheduler. The third-party iframe
 * (~1.8 MB of script) loads only after the visitor opts in — keeping
 * /contact inside the Lighthouse CI budgets (script <= 260 kB first-party).
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <iframe
        src={`${url}?hide_gdpr_banner=1&background_color=080a0d&text_color=ffffff&primary_color=a2fa8e`}
        title="Book a discovery call with Driftpilot"
        className="w-full rounded-lg border border-line bg-raised"
        style={{ height: 700 }}
      />
    );
  }

  return (
    <div className="max-w-xl rounded-lg border border-line bg-surface p-6 md:p-8">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent mb-4">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
      <h3 className="text-lg font-semibold text-fg">Pick a time that works for you.</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Opens our live calendar — 30 minutes, free, no commitment.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={buttonClasses({ size: 'md' })}
        >
          Open the scheduler →
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: 'ghost', size: 'md', className: 'px-0' })}
        >
          Open in a new tab
        </a>
      </div>
    </div>
  );
}
