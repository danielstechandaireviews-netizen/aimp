"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./contact-form";

/** Maps ?topic= values used in links across the site to contact-form topics. */
const topicMap: Record<string, string> = {
  courses: "Courses",
  mentorship: "1-on-1 mentorship",
  community: "Community / cohort training",
  services: "AI services for my business",
  speaking: "Speaking / media",
};

export function ContactFormWithTopic() {
  const topic = topicMap[useSearchParams().get("topic") ?? ""];
  return <ContactForm key={topic} defaultTopic={topic} />;
}
