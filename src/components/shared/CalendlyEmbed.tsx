'use client';

import { useEffect, useRef, useState } from 'react';
import { buttonClasses } from '@/components/ui/button';
import { KIVO } from '@/lib/design-tokens';

/**
 * Click-to-load facade for the Calendly scheduler. The third-party iframe
 * (~1.8 MB of script) loads only after the visitor opts in — keeping
 * /contact inside the Lighthouse CI budgets (script <= 260 kB first-party).
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // The facade button unmounts on open; move focus to the iframe so
  // keyboard and screen-reader users land on the scheduler, not <body>.
  useEffect(() => {
    if (open) iframeRef.current?.focus();
  }, [open]);

  if (open) {
    // Theme params come from the design tokens so they can't drift from
    // globals.css; Calendly wants bare hex (no #).
    const src = new URL(url);
    src.searchParams.set('hide_gdpr_banner', '1');
    src.searchParams.set('background_color', KIVO.raised.slice(1));
    src.searchParams.set('text_color', KIVO.fg.slice(1));
    src.searchParams.set('primary_color', KIVO.accent.slice(1));

    return (
      <iframe
        ref={iframeRef}
        src={src.toString()}
        title="Book a discovery call with Driftpilot"
        className="w-full rounded-lg border border-line bg-raised h-[1000px] md:h-[700px]"
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
