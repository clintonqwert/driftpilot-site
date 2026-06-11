'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitEarlyAccess } from '@/lib/actions/submit-early-access';
import type { EarlyAccessFormResult } from '@/types/forms';

const inputBase =
  'w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow';
const inputError = 'border-danger-600 focus:ring-danger-500';
const labelBase = 'block text-sm font-medium text-ink-700 mb-1.5';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-danger-600">
      {message}
    </p>
  );
}

export function EarlyAccessForm() {
  const [state, formAction, isPending] = useActionState<EarlyAccessFormResult | null, FormData>(
    submitEarlyAccess,
    null,
  );

  const startedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAtRef.current) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  const errors = state && !state.ok ? state.errors : {};
  const values = state && !state.ok ? state.values : undefined;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* Spam: honeypot */}
      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <input name="website" type="text" autoComplete="off" tabIndex={-1} />
      </div>
      {/* Spam: time-to-submit */}
      <input ref={startedAtRef} type="hidden" name="startedAt" />

      {/* Name */}
      <div>
        <label htmlFor="ea-name" className={labelBase}>
          Full name <span className="text-danger-600" aria-hidden="true">*</span>
        </label>
        <input
          id="ea-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Alex Johnson"
          defaultValue={values?.name}
          className={`${inputBase} ${errors.name ? inputError : ''}`}
          aria-describedby={errors.name ? 'ea-name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
        />
        <FieldError id="ea-name-error" message={errors.name} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="ea-email" className={labelBase}>
          Email address <span className="text-danger-600" aria-hidden="true">*</span>
        </label>
        <input
          id="ea-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="alex@dealership.com"
          defaultValue={values?.email}
          className={`${inputBase} ${errors.email ? inputError : ''}`}
          aria-describedby={errors.email ? 'ea-email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
        />
        <FieldError id="ea-email-error" message={errors.email} />
      </div>

      {/* Dealership */}
      <div>
        <label htmlFor="ea-dealership" className={labelBase}>
          Dealership name <span className="text-ink-400 font-normal">(optional)</span>
        </label>
        <input
          id="ea-dealership"
          name="dealership"
          type="text"
          autoComplete="organization"
          placeholder="Metro Auto Group"
          defaultValue={values?.dealership}
          className={inputBase}
        />
      </div>

      {errors.form && (
        <p role="alert" className="text-sm text-danger-600 bg-danger-50 border border-danger-200 rounded-lg px-4 py-3">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 inline-flex items-center justify-center gap-2 h-13 px-7 w-full rounded-lg bg-brand-600 text-white text-base font-semibold transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 shadow-brand disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Joining…' : 'Join the waitlist →'}
      </button>

      <p className="text-xs text-ink-400 text-center">
        No commitment. No spam. First to know when we launch.
      </p>
    </form>
  );
}
