/**
 * Form state shared by client form components and server actions.
 * Kept free of zod so validation code never ships to the browser.
 */

/** Hidden honeypot field — real users never fill it in. */
export const HONEYPOT_FIELD = "company_website";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  /** Echo submitted values so fields aren't wiped on a validation error. */
  values?: Record<string, string>;
  /** Extra payload, e.g. a download link for the lead magnet. */
  data?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };
