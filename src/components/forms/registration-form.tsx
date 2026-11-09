"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { registerForCohort } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { FormMessage, Honeypot, PrivacyNote, SelectField, SubmitButton, TextAreaField, TextField } from "./form-fields";

const experienceLevels = ["Complete beginner", "I've used AI tools like ChatGPT", "I can code a little", "Experienced developer"];

export function RegistrationForm({ route, source }: { route: string; source: string }) {
  const [state, action] = useActionState(registerForCohort, initialFormState);
  const f = "registration";

  if (state.status === "success") {
    return (
      <div role="status" className="text-center">
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-success" />
        <h2 className="mt-4 text-2xl font-bold">You&apos;re in!</h2>
        <p className="mt-2 text-muted-foreground">{state.message}</p>
        {state.data?.whatsappUrl && (
          <Button asChild variant="cta" size="lg" className="mt-6 w-full">
            <a href={state.data.whatsappUrl} target="_blank" rel="noopener noreferrer">
              Message Daniel on WhatsApp now
            </a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative space-y-5">
      <Honeypot />
      <input type="hidden" name="route" value={route} />
      <input type="hidden" name="source" value={source} />
      <TextField formId={f} name="name" label="Full name" autoComplete="name" required state={state} />
      <TextField formId={f} name="email" type="email" label="Email" autoComplete="email" required state={state} />
      <TextField
        formId={f}
        name="whatsapp"
        type="tel"
        label="WhatsApp number"
        autoComplete="tel"
        placeholder="+234 800 000 0000"
        hint="Include your country code. Daniel will send payment details here."
        required
        state={state}
      />
      <TextField formId={f} name="country" label="Country" autoComplete="country-name" required state={state} />
      <SelectField formId={f} name="experience" label="Your experience" options={experienceLevels} required state={state} />
      <TextAreaField formId={f} name="goal" label="What do you want to build or earn from this?" rows={3} state={state} />
      <FormMessage state={state} />
      <SubmitButton className="w-full">Register my seat</SubmitButton>
      <PrivacyNote />
    </form>
  );
}
