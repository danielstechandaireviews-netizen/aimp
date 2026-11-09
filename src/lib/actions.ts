"use server";

import { z } from "zod";
import { bootcamp, currentCohort, getBootcampRoute } from "@/content/bootcamps";
import { siteConfig, whatsappUrl } from "@/content/site";
import { sendLeadMagnet, sendNotification, sendRegistrationConfirmation } from "@/lib/email";
import { subscribe } from "@/lib/newsletter";
import { HONEYPOT_FIELD, type FormState } from "@/lib/form-state";
import { addRegistration } from "@/lib/registrations";
import {
  contactSchema,
  leadMagnetSchema,
  newsletterSchema,
  registrationSchema,
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

export async function registerForCohort(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "You're registered." };
  const result = validate(registrationSchema, formData);
  if ("error" in result) return result.error!;
  const d = result.data;
  const bootcampRoute = getBootcampRoute(d.route)!;
  const firstName = d.name.split(" ")[0];
  const chat = whatsappUrl(`Hi Daniel, I just registered for the ${currentCohort.month} ${bootcampRoute.track} bootcamp. My name is ${d.name}.`);

  const saved = await addRegistration({
    cohort: currentCohort.id,
    route: d.route,
    full_name: d.name,
    email: d.email,
    whatsapp: d.whatsapp,
    country: d.country,
    experience: d.experience,
    goal: d.goal || null,
    source: d.source || null,
  });

  if (saved.ok && saved.duplicate) {
    return {
      status: "success",
      message: `${firstName}, you're already registered for ${bootcampRoute.track}. Daniel will be in touch on WhatsApp.`,
      data: { whatsappUrl: chat },
    };
  }

  const notified = await sendNotification(
    `New ${currentCohort.month} registration: ${bootcampRoute.track}`,
    {
      Route: bootcampRoute.track,
      Name: d.name,
      Email: d.email,
      WhatsApp: d.whatsapp,
      Country: d.country,
      Experience: d.experience,
      Goal: d.goal,
      Source: d.source,
    },
    d.email,
  );
  // Either copy is enough to keep the registration, so only fail when both are lost.
  if (!saved.ok && !notified.ok) return { status: "error", message: GENERIC_ERROR, values: result.values };

  const confirmed = await sendRegistrationConfirmation(d.email, firstName, {
    track: bootcampRoute.track,
    cohort: currentCohort.title,
    dates: currentCohort.dates,
    price: `$${bootcamp.price.USD} USD`,
    whatsappUrl: chat,
  });
  if (!confirmed.ok) console.error("[registration] confirmation email failed:", confirmed.error);

  return {
    status: "success",
    message: `You're registered for ${bootcampRoute.track}, ${firstName}! Daniel will message you on WhatsApp with payment details for your $${bootcamp.price.USD} USD seat.`,
    data: { whatsappUrl: chat },
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
