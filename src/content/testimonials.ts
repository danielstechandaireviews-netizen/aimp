import type { Partner, Testimonial } from "./types";

/**
 * Testimonials — ALL PLACEHOLDERS.
 * Only replace these with genuine testimonials you have permission to publish.
 * Set `placeholder: false` on each real one (this removes the placeholder label).
 */
export const testimonials: Testimonial[] = [
  {
    placeholder: true,
    quote: "[Testimonial from student — replace with a real quote about a course]",
    name: "[Student name]",
    role: "[Role / company]",
    location: "[City, Country]",
    context: "Course",
  },
  {
    placeholder: true,
    quote: "[Testimonial from mentee — replace with a real quote about 1-on-1 mentorship]",
    name: "[Mentee name]",
    role: "[Role / company]",
    location: "[City, Country]",
    context: "Mentorship",
  },
  {
    placeholder: true,
    quote: "[Testimonial from community organiser — replace with a real quote about community training]",
    name: "[Organiser name]",
    role: "[Community name]",
    location: "[City, Country]",
    context: "Community",
  },
  {
    placeholder: true,
    quote: "[Testimonial from student — replace with a real quote about landing a first client or income stream]",
    name: "[Student name]",
    role: "[Role / business]",
    location: "[City, Country]",
    context: "Course",
  },
  {
    placeholder: true,
    quote: "[Testimonial from small business client — replace with a real quote about an AI project]",
    name: "[Client name]",
    role: "[Role / company]",
    location: "[City, Country]",
    context: "Services",
  },
  {
    placeholder: true,
    quote: "[Testimonial from student — replace with a real quote about results achieved]",
    name: "[Student name]",
    role: "[Role / company]",
    location: "[City, Country]",
    context: "Course",
  },
];

/**
 * Communities & partners logo strip — ALL PLACEHOLDERS.
 * Add a logo file to /public/images/partners and set `logo`, `name`, `url`,
 * and `placeholder: false`. Only list organisations you have permission to show.
 */
export const partners: Partner[] = [
  { name: "[Community 1]", placeholder: true },
  { name: "[Community 2]", placeholder: true },
  { name: "[Partner 1]", placeholder: true },
  { name: "[Community 3]", placeholder: true },
  { name: "[Partner 2]", placeholder: true },
  { name: "[Community 4]", placeholder: true },
];
