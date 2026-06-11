/** Form data contracts shared by client forms and Server Actions. */

export const BUDGET_OPTIONS = [
  "under-5k",
  "5k-15k",
  "15k-50k",
  "50k-plus",
] as const;

export type BudgetRange = (typeof BUDGET_OPTIONS)[number];

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget: BudgetRange;
  message: string;
}

export interface EarlyAccessFormData {
  name: string;
  email: string;
  dealership?: string;
}

/** Safe-to-echo values returned alongside validation errors (excludes honeypot/startedAt). */
export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export interface EarlyAccessFormValues {
  name: string;
  email: string;
  dealership: string;
}

export type FormResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string>; values: ContactFormValues };

export type EarlyAccessFormResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string>; values: EarlyAccessFormValues };
