"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Download } from "lucide-react";
import { requestLeadMagnet } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { FormMessage, Honeypot, SubmitButton, TextField } from "./form-fields";

export function LeadMagnetForm() {
  const [state, action] = useActionState(requestLeadMagnet, initialFormState);
  const f = "roadmap";
  const consentError = state.fieldErrors?.consent?.[0];

  if (state.status === "success") {
    return (
      <div className="space-y-5">
        <FormMessage state={state} />
        {state.data?.downloadUrl && (
          <Button asChild variant="cta" size="xl" className="w-full sm:w-auto">
            <a href={state.data.downloadUrl} download>
              <Download aria-hidden />
              Download the AI Career Roadmap (PDF)
            </a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative space-y-5">
      <Honeypot />
      <TextField formId={f} name="firstName" label="First name" autoComplete="given-name" required state={state} />
      <TextField formId={f} name="email" type="email" label="Email" autoComplete="email" required state={state} />
      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={consentError ? true : undefined}
            aria-describedby={consentError ? `${f}-consent-error` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[var(--brand)]"
          />
          <span className="text-muted-foreground">
            Send me the roadmap and occasional emails about AI skills, courses and events. I can unsubscribe at any time. See
            the{" "}
            <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {consentError && (
          <p id={`${f}-consent-error`} className="text-sm text-destructive">
            {consentError}
          </p>
        )}
      </div>
      <FormMessage state={state} />
      <SubmitButton className="w-full">Get the free roadmap</SubmitButton>
    </form>
  );
}
