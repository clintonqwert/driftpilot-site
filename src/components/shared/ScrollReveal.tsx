'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Global observer for [data-reveal] elements (styles in globals.css).
 * Renders nothing; mounted once in the root layout. Re-runs per route so
 * client navigations get entrances too.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)'),
    );
    // Anything already in the viewport is marked revealed *before* html.js
    // enables the hidden state — visible content never flashes out.
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('is-revealed');
      }
    }
    document.documentElement.classList.add('js');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    for (const el of els) {
      if (!el.classList.contains('is-revealed')) io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
