import type { Partner, Testimonial } from "./types";

/**
 * Testimonials. Only publish genuine testimonials you have permission to use.
 * Placeholders keep `placeholder: true` (this shows a placeholder label).
 */
export const testimonials: Testimonial[] = [
  {
    placeholder: false,
    quote: "Dan, well done! Your AI course is so nice, especially the way you explain it. I so love it.",
    name: "Mimi",
    role: "AI course student",
    location: "Canada",
    country: "CA",
    context: "Course",
  },
  {
    placeholder: false,
    quote: "Even without a session, your course explains it all, but I love the opportunity to contact and work with you.",
    name: "Sarkirat",
    role: "AI course student",
    location: "United States",
    country: "US",
    context: "Course",
  },
  {
    placeholder: false,
    quote: "Thank you so much, sir, for the opportunity to mentor under you. I am happy I made this decision. I am confident that I can build any type of business app.",
    name: "Paul",
    role: "1-on-1 mentee",
    location: "Nigeria",
    country: "NG",
    context: "Mentorship",
  },
  {
    placeholder: false,
    quote: "My one-on-one sessions with you have given me so much confidence to build any software in the shortest possible time.",
    name: "Bisola",
    role: "1-on-1 mentee",
    location: "United Kingdom",
    country: "GB",
    context: "Mentorship",
  },
  {
    placeholder: false,
    quote: "I got great feedback from my referral that you delivered your course so well. Well done, bro.",
    name: "Ruthie",
    role: "Referred a student",
    location: "Canada",
    country: "CA",
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
