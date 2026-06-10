'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Automotive', href: '/automotive' },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const textColor = isScrolled ? 'text-ink-900' : 'text-white';
  const hoverColor = isScrolled ? 'hover:text-ink-600' : 'hover:text-ink-300';

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-container px-5 md:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Driftpilot home"
              className={`text-lg font-semibold tracking-tight transition-colors duration-200 ${textColor}`}
            >
              Driftpilot
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              <Link
                href="/services"
                className={`text-sm font-medium transition-colors duration-150 ${textColor} ${hoverColor}`}
              >
                Services
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-150 ${textColor} ${hoverColor}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-brand-600 text-white text-sm font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Book a Scope Call
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className={`md:hidden flex flex-col justify-center gap-1.5 w-11 h-11 rounded-lg transition-colors ${textColor}`}
            >
              <span
                className={`block h-0.5 w-6 mx-auto rounded-full bg-current transition-transform duration-200 ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 mx-auto rounded-full bg-current transition-opacity duration-200 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 mx-auto rounded-full bg-current transition-transform duration-200 ${
                  isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink-950/60"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-ink-950 flex flex-col">
            <div className="flex items-center justify-between h-16 px-5">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Driftpilot
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-ink-400 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-5 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              <Link
                href="/services"
                className="py-3 text-lg font-medium text-ink-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-lg font-medium text-ink-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <Link
                href="/contact"
                className="flex items-center justify-center h-12 w-full rounded-lg bg-brand-600 text-white text-base font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Scope Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
