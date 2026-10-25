import type { Project } from "./types";

/**
 * Projects & student builds on /projects.
 *
 * ⚠️ ALL SIX ENTRIES BELOW ARE PLACEHOLDERS. They show the *kind* of work
 * AIMoniPoint and its students build for small and medium businesses — they are
 * not real clients or real results. Replace each one with a real project (client
 * details anonymised if needed) and set `placeholder: false`.
 * While `placeholder` is true the site shows a visible "Placeholder" label
 * and the page is hidden from search engines.
 */
export const projects: Project[] = [
  {
    slug: "placeholder-website-ai-assistant",
    placeholder: true,
    title: "[Placeholder] AI website assistant for a local clinic",
    kind: "Client project",
    service: "AI Software",
    sector: "Health & wellness",
    clientType: "[Client type — e.g. Small physiotherapy clinic]",
    summary: "[Replace] A chat assistant that answers patient questions from the clinic's own website and FAQs.",
    challenge: "[Replace with the real challenge — what problem did the business face, and why did it matter?]",
    solution: "[Replace with what was built — approach, tools and key decisions.]",
    techStack: ["[Next.js]", "[OpenAI API]", "[RAG]", "[Supabase]"],
    role: "[Replace — e.g. Design & build]",
    results: [
      { metric: "[X]%", label: "[Result metric — replace]" },
      { metric: "[X] hrs", label: "[Result metric — replace]" },
    ],
    images: [],
  },
  {
    slug: "placeholder-ecommerce-order-automation",
    placeholder: true,
    title: "[Placeholder] Order & customer-email automation for an online store",
    kind: "Client project",
    service: "AI Automation",
    sector: "E-commerce",
    clientType: "[Client type — replace]",
    summary: "[Replace] n8n workflows that sort customer emails, draft replies and update orders automatically.",
    challenge: "[Replace with the real challenge.]",
    solution: "[Replace with the real solution.]",
    techStack: ["[n8n]", "[OpenAI API]", "[Shopify]", "[Gmail]"],
    role: "[Replace]",
    results: [
      { metric: "[X] hrs/wk", label: "[Result metric — replace]" },
      { metric: "[X]%", label: "[Result metric — replace]" },
    ],
    images: [],
  },
  {
    slug: "placeholder-booking-agent",
    placeholder: true,
    title: "[Placeholder] WhatsApp booking agent for a salon",
    kind: "Client project",
    service: "AI Agents",
    sector: "Beauty & personal care",
    clientType: "[Client type — replace]",
    summary: "[Replace] An AI agent that answers enquiries on WhatsApp and books appointments into the calendar.",
    challenge: "[Replace with the real challenge.]",
    solution: "[Replace with the real solution.]",
    techStack: ["[Agent framework]", "[WhatsApp Business API]", "[Google Calendar]"],
    role: "[Replace]",
    results: [{ metric: "[X]", label: "[Result metric — replace]" }],
    images: [],
  },
  {
    slug: "placeholder-student-invoice-automation",
    placeholder: true,
    title: "[Placeholder] Student build: invoice-to-spreadsheet automation",
    kind: "Student build",
    service: "AI Automation",
    sector: "Accounting & bookkeeping",
    clientType: "[Student name / first client — replace]",
    summary: "[Replace] A course graduate's first paid automation: AI reads invoices and logs them for a bookkeeper.",
    challenge: "[Replace with the real challenge.]",
    solution: "[Replace with the real solution.]",
    techStack: ["[Make]", "[OpenAI API]", "[Google Sheets]"],
    role: "[Replace — e.g. Built by student, mentored by Daniel]",
    results: [{ metric: "[X]", label: "[Result metric — replace]" }],
    images: [],
  },
  {
    slug: "placeholder-student-real-estate-chatbot",
    placeholder: true,
    title: "[Placeholder] Student build: property enquiry chatbot",
    kind: "Student build",
    service: "AI Software",
    sector: "Real estate",
    clientType: "[Student name / client — replace]",
    summary: "[Replace] A RAG chatbot that answers property questions and captures leads for an estate agent.",
    challenge: "[Replace with the real challenge.]",
    solution: "[Replace with the real solution.]",
    techStack: ["[Python]", "[RAG]", "[Vector database]"],
    role: "[Replace]",
    results: [{ metric: "[X]", label: "[Result metric — replace]" }],
    images: [],
  },
  {
    slug: "placeholder-lead-qualification-agent",
    placeholder: true,
    title: "[Placeholder] Lead-qualification agent for a service business",
    kind: "Client project",
    service: "AI Agents",
    sector: "Professional services",
    clientType: "[Client type — replace]",
    summary: "[Replace] An agent that qualifies new enquiries, updates the CRM and schedules sales calls.",
    challenge: "[Replace with the real challenge.]",
    solution: "[Replace with the real solution.]",
    techStack: ["[n8n AI agent]", "[HubSpot]", "[Calendly]"],
    role: "[Replace]",
    results: [{ metric: "[X]%", label: "[Result metric — replace]" }],
    images: [],
  },
];

export const projectServices = ["AI Software", "AI Automation", "AI Agents"] as const;
export const projectKinds = ["Client project", "Student build"] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
