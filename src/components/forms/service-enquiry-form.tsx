"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { budgetRanges, timelineOptions } from "@/content/services";
import { submitServiceEnquiry } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { FormMessage, Honeypot, PrivacyNote, SelectField, SubmitButton, TextAreaField, TextField } from "./form-fields";

export function ServiceEnquiryForm({ services }: { services: string[] }) {
  const [state, action] = useActionState(submitServiceEnquiry, initialFormState);
  const f = "service";
  const preset = useSearchParams().get("service") ?? undefined;

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form action={action} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField formId={f} name="name" label="Full name" autoComplete="name" required state={state} />
        <TextField formId={f} name="email" type="email" label="Work email" autoComplete="email" required state={state} />
        <TextField formId={f} name="company" label="Company" autoComplete="organization" state={state} />
        <TextField formId={f} name="country" label="Country" autoComplete="country-name" required state={state} />
      </div>
      <SelectField
        key={preset}
        formId={f}
        name="service"
        label="Service"
        options={[...services, "Not sure yet"]}
        defaultValue={preset && services.includes(preset) ? preset : undefined}
        required
        state={state}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          formId={f}
          name="budget"
          label="Budget range"
          options={budgetRanges}
          hint="Indicative, in your local currency"
          required
          state={state}
        />
        <SelectField formId={f} name="timeline" label="Timeline" options={timelineOptions} required state={state} />
      </div>
      <TextAreaField
        formId={f}
        name="description"
        label="Project description"
        placeholder="What are you trying to achieve? What systems, data or tools are involved?"
        rows={6}
        required
        state={state}
      />
      <FormMessage state={state} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PrivacyNote />
        <SubmitButton>Request a proposal</SubmitButton>
      </div>
    </form>
  );
}
