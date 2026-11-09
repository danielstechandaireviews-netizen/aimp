"use client";

import { useActionState } from "react";
import { adminLogin } from "@/lib/admin-actions";
import { initialFormState } from "@/lib/form-state";
import { FormMessage, SubmitButton, TextField } from "./form-fields";

export function AdminLoginForm() {
  const [state, action] = useActionState(adminLogin, initialFormState);

  return (
    <form action={action} className="space-y-5">
      <TextField formId="admin" name="password" type="password" label="Password" autoComplete="current-password" required state={state} />
      <FormMessage state={state} />
      <SubmitButton className="w-full">Log in</SubmitButton>
    </form>
  );
}
