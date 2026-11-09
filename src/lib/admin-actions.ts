"use server";

import { redirect } from "next/navigation";
import { endAdminSession, isAdminConfigured, isCorrectPassword, startAdminSession } from "@/lib/admin-auth";
import type { FormState } from "@/lib/form-state";

export async function adminLogin(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = formData.get("password");
  if (!isAdminConfigured() || typeof password !== "string" || !isCorrectPassword(password)) {
    // Slows down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { status: "error", message: "That password isn't right." };
  }
  await startAdminSession();
  redirect("/admin/registrations");
}

export async function adminLogout() {
  await endAdminSession();
  redirect("/admin/registrations");
}
