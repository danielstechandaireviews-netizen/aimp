"use client";

import { useActionState } from "react";
import { submitContact } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { FormMessage, Honeypot, PrivacyNote, SelectField, SubmitButton, TextAreaField, TextField } from "./form-fields";

const topics = ["Courses", "1-on-1 mentorship", "Community / cohort training", "AI services for my business", "Speaking / media", "Something else"];

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [state, action] = useActionState(submitContact, initialFormState);
  const f = "contact";

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form action={action} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField formId={f} name="name" label="Full name" autoComplete="name" required state={state} />
        <TextField formId={f} name="email" type="email" label="Email" autoComplete="email" required state={state} />
      </div>
      <SelectField formId={f} name="topic" label="What can we help with?" options={topics} defaultValue={defaultTopic} state={state} />
      <TextAreaField formId={f} name="message" label="Message" required rows={6} state={state} />
      <FormMessage state={state} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PrivacyNote />
        <SubmitButton className="sm:w-auto">Send message</SubmitButton>
      </div>
    </form>
  );
}
