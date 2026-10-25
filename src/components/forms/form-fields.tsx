"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HONEYPOT_FIELD, type FormState } from "@/lib/form-state";
import { cn } from "@/lib/utils";

type Common = {
  name: string;
  label: string;
  state: FormState;
  required?: boolean;
  hint?: string;
  className?: string;
};

function useFieldProps(id: string, name: string, state: FormState, hint?: string) {
  const error = state.fieldErrors?.[name]?.[0];
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return { error, describedBy };
}

function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden className="text-brand-text">
            *
          </span>
        ) : (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </Label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldClass = "h-11 bg-background/60 dark:bg-input/20";

export function TextField({
  type = "text",
  autoComplete,
  placeholder,
  formId,
  ...p
}: Common & { type?: string; autoComplete?: string; placeholder?: string; formId: string }) {
  const id = `${formId}-${p.name}`;
  const { error, describedBy } = useFieldProps(id, p.name, p.state, p.hint);
  return (
    <FieldShell id={id} label={p.label} required={p.required} hint={p.hint} error={error} className={p.className}>
      <Input
        id={id}
        name={p.name}
        type={type}
        required={p.required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={p.state.values?.[p.name]}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={fieldClass}
      />
    </FieldShell>
  );
}

export function TextAreaField({ rows = 5, placeholder, formId, ...p }: Common & { rows?: number; placeholder?: string; formId: string }) {
  const id = `${formId}-${p.name}`;
  const { error, describedBy } = useFieldProps(id, p.name, p.state, p.hint);
  return (
    <FieldShell id={id} label={p.label} required={p.required} hint={p.hint} error={error} className={p.className}>
      <Textarea
        id={id}
        name={p.name}
        rows={rows}
        required={p.required}
        placeholder={placeholder}
        defaultValue={p.state.values?.[p.name]}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="bg-background/60 dark:bg-input/20"
      />
    </FieldShell>
  );
}

export function SelectField({
  options,
  placeholder = "Please choose…",
  defaultValue,
  formId,
  ...p
}: Common & { options: string[]; placeholder?: string; defaultValue?: string; formId: string }) {
  const id = `${formId}-${p.name}`;
  const { error, describedBy } = useFieldProps(id, p.name, p.state, p.hint);
  return (
    <FieldShell id={id} label={p.label} required={p.required} hint={p.hint} error={error} className={p.className}>
      <select
        id={id}
        name={p.name}
        required={p.required}
        defaultValue={p.state.values?.[p.name] ?? defaultValue ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          fieldClass,
          "w-full rounded-md border border-input px-3 text-base shadow-xs outline-none md:text-sm",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive",
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/** Off-screen trap field for bots. Hidden from people and assistive tech. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="cta" size="lg" disabled={pending} className={className}>
      {pending && <Loader2 aria-hidden className="animate-spin" />}
      {pending ? "Sending…" : children}
    </Button>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  if (state.status === "idle" || !state.message) return null;
  const success = state.status === "success";
  return (
    <div
      role={success ? "status" : "alert"}
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 text-sm",
        success ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10",
      )}
    >
      {success ? (
        <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
      ) : (
        <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-destructive" />
      )}
      <p>{state.message}</p>
    </div>
  );
}

export function PrivacyNote() {
  return (
    <p className="text-xs text-muted-foreground">
      We&apos;ll only use your details to respond to your enquiry. See our{" "}
      <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-foreground">
        Privacy Policy
      </Link>
      .
    </p>
  );
}
