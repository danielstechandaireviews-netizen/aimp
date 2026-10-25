"use server";

import { z } from "zod";
import { siteConfig } from "@/content/site";
import { sendLeadMagnet, sendNotification } from "@/lib/email";
import { subscribe } from "@/lib/newsletter";
import { HONEYPOT_FIELD, type FormState } from "@/lib/form-state";
import {
  contactSchema,
  leadMagnetSchema,
  newsletterSchema,
  serviceEnquirySchema,
  trainingEnquirySchema,
} from "@/lib/schemas";
import { absoluteUrl } from "@/lib/utils";

const GENERIC_ERROR = `Sorry, something went wrong sending your message. Please try again, or email ${siteConfig.contact.email}.`;

function toValues(formData: FormData) {
  const values: Record<string, string> = {};
  formData.forEach((v, k) => {
    if (typeof v === "string" && k !== HONEYPOT_FIELD && !k.startsWith("$")) values[k] = v;
  });
  return values;
}

/** Bots fill in hidden fields; pretend success so they move on. */
function isSpam(formData: FormData) {
  const trap = formData.get(HONEYPOT_FIELD);
  return typeof trap === "string" && trap.length > 0;
}

function validate<T extends z.ZodType>(schema: T, formData: FormData) {
  const values = toValues(formData);
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return {
      error: {
        status: "error",
        message: "Please check the highlighted fields.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors as Record<string, string[]>,
        values,
      } satisfies FormState,
    };
  }
  return { data: parsed.data as z.infer<T>, values };
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Thanks — your message has been sent." };
  const result = validate(contactSchema, formData);
  if ("error" in result) return result.error!;
  const d = result.data;

  const res = await sendNotification(
    `Contact form: ${d.topic || "General enquiry"}`,
    { Name: d.name, Email: d.email, Topic: d.topic, Message: d.message },
    d.email,
  );
  if (!res.ok) return { status: "error", message: GENERIC_ERROR, values: result.values };
  return { status: "success", message: `Thanks, ${d.name.split(" ")[0]} — your message has been sent. You'll hear back within 1–2 business days.` };
}

export async function submitServiceEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Thanks — your enquiry has been sent." };
  const result = validate(serviceEnquirySchema, formData);
  if ("error" in result) return result.error!;
  const d = result.data;

  const res = await sendNotification(
    `Service enquiry: ${d.service}`,
    {
      Name: d.name,
      Email: d.email,
      Company: d.company,
      Country: d.country,
      Service: d.service,
      Budget: d.budget,
      Timeline: d.timeline,
      Description: d.description,
    },
    d.email,
  );
  if (!res.ok) return { status: "error", message: GENERIC_ERROR, values: result.values };
  return {
    status: "success",
    message: `Thanks, ${d.name.split(" ")[0]} — your enquiry has been received. Expect a reply within 1–2 business days to arrange a discovery call.`,
  };
}

export async function submitTrainingEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Thanks — your enquiry has been sent." };
  const result = validate(trainingEnquirySchema, formData);
  if ("error" in result) return result.error!;
  const d = result.data;

  const res = await sendNotification(
    `Training enquiry: ${d.offering}`,
    {
      Name: d.name,
      Email: d.email,
      Organisation: d.organisation,
      Country: d.country,
      "Training type": d.offering,
      "Group size": d.groupSize,
      Message: d.message,
    },
    d.email,
  );
  if (!res.ok) return { status: "error", message: GENERIC_ERROR, values: result.values };
  return {
    status: "success",
    message: `Thanks, ${d.name.split(" ")[0]} — your training enquiry has been received. You'll hear back within 1–2 business days.`,
  };
}

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "You're subscribed." };
  const result = validate(newsletterSchema, formData);
  if ("error" in result) return result.error!;

  const res = await subscribe(result.data.email, result.data.firstName || undefined, "website-newsletter");
  if (!res.ok) return { status: "error", message: "Sorry, we couldn't subscribe you just now. Please try again later.", values: result.values };
  return { status: "success", message: "You're in! Check your inbox for a confirmation email." };
}

export async function requestLeadMagnet(_prev: FormState, formData: FormData): Promise<FormState> {
  const downloadUrl = absoluteUrl(siteConfig.leadMagnet.file);
  if (isSpam(formData)) return { status: "success", message: "Check your inbox.", data: { downloadUrl } };
  const result = validate(leadMagnetSchema, formData);
  if ("error" in result) return result.error!;
  const d = result.data;

  // Subscription failures shouldn't block the download — log and continue.
  const sub = await subscribe(d.email, d.firstName, "lead-magnet-ai-career-roadmap");
  if (!sub.ok) console.error("[lead-magnet] subscribe failed:", sub.error);

  const mail = await sendLeadMagnet(d.email, d.firstName, siteConfig.leadMagnet.title, downloadUrl);
  if (!mail.ok) console.error("[lead-magnet] email failed:", mail.error);

  return {
    status: "success",
    message: `Thanks, ${d.firstName}! Your roadmap is ready — download it below.${mail.ok ? " We've also emailed you a copy." : ""}`,
    data: { downloadUrl: siteConfig.leadMagnet.file },
  };
}
