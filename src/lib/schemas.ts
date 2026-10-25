import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name").max(100);
const email = z.email("Please enter a valid email address").trim().max(200);
const optional = (max = 200) => z.string().trim().max(max).optional().or(z.literal(""));

export const contactSchema = z.object({
  name,
  email,
  topic: optional(100),
  message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters)").max(5000),
});

export const serviceEnquirySchema = z.object({
  name,
  email,
  company: optional(),
  country: z.string().trim().min(2, "Please enter your country").max(100),
  service: z.string().trim().min(1, "Please choose a service").max(200),
  budget: z.string().trim().min(1, "Please choose a budget range").max(100),
  timeline: z.string().trim().min(1, "Please choose a timeline").max(100),
  description: z.string().trim().min(20, "Please describe your project (at least 20 characters)").max(5000),
});

export const trainingEnquirySchema = z.object({
  name,
  email,
  organisation: optional(),
  country: z.string().trim().min(2, "Please enter your country").max(100),
  offering: z.string().trim().min(1, "Please choose a training type").max(100),
  groupSize: optional(50),
  message: z.string().trim().min(10, "Please tell us a little about your goals").max(5000),
});

export const newsletterSchema = z.object({
  email,
  firstName: optional(100),
});

export const leadMagnetSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(100),
  email,
  consent: z.literal("on", { error: "Please agree to receive emails so we can send your roadmap" }),
});
