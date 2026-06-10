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

export type FormResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };
