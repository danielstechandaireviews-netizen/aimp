import type { Service } from "./types";

/**
 * Done-for-you AI services for small and medium businesses (SMBs), shown on /services.
 * Each service links to the course that teaches learners to deliver the same service.
 *
 * `startingAt` prices are SAMPLE PRICES — replace them (or set to null for "Custom quote").
 */
export const services: Service[] = [
  {
    slug: "rapid-ai-software-development",
    title: "Rapid AI Software Development",
    shortTitle: "AI Software",
    icon: "rocket",
    summary:
      "AI-powered web apps, assistants and MVPs for small and medium businesses — designed, built and launched in weeks, not months.",
    problem:
      "You have an idea for an AI tool — a customer assistant, an internal knowledge bot, a smarter booking or quoting app — but hiring a full development team is slow and expensive.",
    solution:
      "A lean, rapid build process: we agree the smallest version that delivers value, build it with proven AI components, launch it, and improve it with real feedback.",
    examples: [
      "AI chat assistant trained on your website, FAQs and documents",
      "Internal knowledge assistant for your team",
      "AI-powered quote, proposal or report generator",
      "Adding AI features (summaries, search, drafting) to an existing app",
      "A minimum viable AI product (MVP) to test a business idea",
    ],
    deliverables: [
      "Discovery session and one-page scope",
      "Working AI application or feature, deployed live",
      "Your data connected securely (documents, website, database)",
      "Simple admin / settings where needed",
      "Handover video and documentation",
      "30 days of post-launch support",
    ],
    timeline: "Typically 2–6 weeks",
    idealFor: "Small and medium businesses and founders who want a working AI tool quickly",
    startingAt: { CAD: 3400, USD: 2500, GBP: 1990, EUR: 2300 },
    learnCourse: "ai-software-development-bootcamp",
  },
  {
    slug: "ai-automation",
    title: "AI Automation for Small & Medium Businesses",
    shortTitle: "AI Automation",
    icon: "workflow",
    summary:
      "Automate repetitive work — emails, documents, bookings, CRM updates and follow-ups — so your team saves hours every week.",
    problem:
      "Your team loses hours every week to copy-and-paste admin: answering the same emails, re-typing data from forms and invoices, chasing leads and updating spreadsheets.",
    solution:
      "We map your processes, pick the highest-value tasks, and build reliable AI automations with tools like n8n, Make and Zapier — with a person kept in the loop where it matters.",
    examples: [
      "Inbox triage with AI-drafted replies",
      "Invoice, receipt and form data extraction",
      "Lead capture, follow-up and CRM updates",
      "Appointment reminders and customer follow-ups (email / WhatsApp)",
      "Automatic weekly reports and summaries",
    ],
    deliverables: [
      "Process review and automation shortlist",
      "Built and tested automation workflows",
      "AI steps for reading, sorting and drafting",
      "Error alerts so nothing fails silently",
      "Team walkthrough and simple runbook",
      "Optional monthly maintenance plan",
    ],
    timeline: "Typically 1–3 weeks",
    idealFor: "Busy owners and small teams drowning in admin",
    startingAt: { CAD: 1000, USD: 750, GBP: 590, EUR: 690 },
    learnCourse: "ai-automation-masterclass",
  },
  {
    slug: "ai-agents",
    title: "AI Agents for Small & Medium Businesses",
    shortTitle: "AI Agents",
    icon: "bot",
    summary:
      "AI agents that don't just chat — they take action: qualify leads, book appointments, answer customers and handle routine tasks across your tools.",
    problem:
      "Customers expect fast replies at all hours, and routine tasks pile up — but you can't afford to hire more staff for every channel and time zone.",
    solution:
      "We build task-focused AI agents connected to your tools (calendar, CRM, inbox, website, WhatsApp) with clear rules, approval steps for anything important, and monitoring.",
    examples: [
      "Customer-service agent for your website or WhatsApp",
      "Lead-qualification and appointment-booking agent",
      "Sales follow-up agent that drafts and schedules messages",
      "Research agent that compiles reports for you",
      "Back-office agent that updates records across your tools",
    ],
    deliverables: [
      "Agent design: goals, tools, rules and hand-offs",
      "Working agent connected to your tools",
      "Guardrails and human approval for key actions",
      "Testing with real scenarios",
      "Monitoring and usage reports",
      "Handover and optional monthly care plan",
    ],
    timeline: "Typically 2–5 weeks",
    idealFor: "SMBs ready to move from simple chatbots to AI that gets work done",
    startingAt: { CAD: 2000, USD: 1500, GBP: 1190, EUR: 1390 },
    learnCourse: "agentic-ai-autonomous-agents",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Budget ranges on the enquiry form — sized for small and medium businesses. */
export const budgetRanges = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,500",
  "$7,500 – $15,000",
  "$15,000+",
  "Not sure yet",
];

export const timelineOptions = ["As soon as possible", "Within 1 month", "1–3 months", "Just exploring"];
