"use client";

import { useActionState, useId } from "react";
import { subscribeNewsletter } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormMessage, Honeypot, SubmitButton } from "./form-fields";

export function NewsletterForm({ className }: { className?: string }) {
  const [state, action] = useActionState(subscribeNewsletter, initialFormState);
  const id = useId();
  const error = state.fieldErrors?.email?.[0];

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form action={action} noValidate className={cn("relative", className)}>
      <Honeypot />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <Input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          defaultValue={state.values?.email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-11 flex-1 bg-background/60 dark:bg-input/20"
        />
        <SubmitButton>Subscribe</SubmitButton>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {state.status === "error" && !error && <FormMessage state={state} />}
      <p className="mt-3 text-xs text-muted-foreground">
        Practical AI tips, new courses and events. No spam — unsubscribe any time.
      </p>
    </form>
  );
}
