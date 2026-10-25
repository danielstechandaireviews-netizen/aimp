"use client";

import { useActionState } from "react";
import { submitTrainingEnquiry } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { FormMessage, Honeypot, PrivacyNote, SelectField, SubmitButton, TextAreaField, TextField } from "./form-fields";

export function TrainingEnquiryForm({ offerings }: { offerings: string[] }) {
  const [state, action] = useActionState(submitTrainingEnquiry, initialFormState);
  const f = "training";

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form action={action} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField formId={f} name="name" label="Full name" autoComplete="name" required state={state} />
        <TextField formId={f} name="email" type="email" label="Email" autoComplete="email" required state={state} />
        <TextField formId={f} name="organisation" label="Organisation / community" autoComplete="organization" state={state} />
        <TextField formId={f} name="country" label="Country" autoComplete="country-name" required state={state} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField formId={f} name="offering" label="Training type" options={offerings} required state={state} />
        <SelectField
          formId={f}
          name="groupSize"
          label="Group size"
          options={["Just me", "2–10", "11–25", "26–50", "50+"]}
          state={state}
        />
      </div>
      <TextAreaField
        formId={f}
        name="message"
        label="Your goals"
        placeholder="Tell us about your background, goals and any dates or constraints."
        rows={5}
        required
        state={state}
      />
      <FormMessage state={state} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PrivacyNote />
        <SubmitButton>Send enquiry</SubmitButton>
      </div>
    </form>
  );
}
