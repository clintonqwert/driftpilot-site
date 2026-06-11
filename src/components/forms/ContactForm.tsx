'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitContact } from '@/lib/actions/submit-contact';
import { BUDGET_OPTIONS } from '@/types/forms';
import type { FormResult } from '@/types/forms';

const BUDGET_LABELS: Record<typeof BUDGET_OPTIONS[number], string> = {
  'under-5k': 'Under $5,000',
  '5k-15k': '$5,000 – $15,000',
  '15k-50k': '$15,000 – $50,000',
  '50k-plus': '$50,000+',
};

const inputBase =
  'w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow';
const inputError =
  'border-danger-600 focus:ring-danger-500';
const labelBase = 'block text-sm font-medium text-ink-700 mb-1.5';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-danger-600">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormResult | null, FormData>(
    submitContact,
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
        <input
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      {/* Spam: time-to-submit */}
      <input ref={startedAtRef} type="hidden" name="startedAt" />

      {/* Name */}
      <div>
        <label htmlFor="cf-name" className={labelBase}>
          Full name <span className="text-danger-600" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Alex Johnson"
          defaultValue={values?.name}
          className={`${inputBase} ${errors.name ? inputError : ''}`}
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
        />
        <FieldError id="cf-name-error" message={errors.name} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className={labelBase}>
          Work email <span className="text-danger-600" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="alex@company.com"
          defaultValue={values?.email}
          className={`${inputBase} ${errors.email ? inputError : ''}`}
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
        />
        <FieldError id="cf-email-error" message={errors.email} />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="cf-company" className={labelBase}>
          Company <span className="text-ink-400 font-normal">(optional)</span>
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Acme Inc."
          defaultValue={values?.company}
          className={inputBase}
        />
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="cf-budget" className={labelBase}>
          Project budget <span className="text-danger-600" aria-hidden="true">*</span>
        </label>
        <select
          id="cf-budget"
          name="budget"
          required
          defaultValue={values?.budget ?? ""}
          className={`${inputBase} ${errors.budget ? inputError : ''}`}
          aria-describedby={errors.budget ? 'cf-budget-error' : undefined}
          aria-invalid={Boolean(errors.budget)}
        >
          <option value="" disabled>Select a range…</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {BUDGET_LABELS[opt]}
            </option>
          ))}
        </select>
        <FieldError id="cf-budget-error" message={errors.budget} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className={labelBase}>
          Tell us about your project <span className="text-danger-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="What are you building, and what's the main problem you need solved?"
          defaultValue={values?.message}
          className={`${inputBase} resize-y min-h-[120px] ${errors.message ? inputError : ''}`}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          aria-invalid={Boolean(errors.message)}
        />
        <FieldError id="cf-message-error" message={errors.message} />
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
        {isPending ? 'Sending…' : 'Send my brief →'}
      </button>

      <p className="text-xs text-ink-400 text-center">
        We reply within one business day. No sales calls without permission.
      </p>
    </form>
  );
}
