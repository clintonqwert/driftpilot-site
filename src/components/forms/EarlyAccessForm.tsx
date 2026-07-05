'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitEarlyAccess } from '@/lib/actions/submit-early-access';
import type { EarlyAccessFormResult } from '@/types/forms';
import { inputBase, inputError, labelBase, errorBanner, errorText } from '@/components/ui/field';
import { buttonClasses } from '@/components/ui/button';


function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className={errorText}>
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
          Full name <span className="text-danger" aria-hidden="true">*</span>
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
          Email address <span className="text-danger" aria-hidden="true">*</span>
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
          Dealership name <span className="text-muted font-normal">(optional)</span>
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
        <p role="alert" className={errorBanner}>
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={buttonClasses({ size: 'lg', className: 'mt-1 w-full' })}
      >
        {isPending ? 'Joining…' : 'Join the waitlist →'}
      </button>

      <p className="text-xs text-muted text-center">
        No commitment. No spam. First to know when we launch.
      </p>
    </form>
  );
}
