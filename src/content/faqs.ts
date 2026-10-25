import type { FaqItem } from "./types";

/** Grouped FAQs for /faq. A selection also appears on the home page. */
export const faqGroups: { id: string; title: string; items: FaqItem[] }[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        question: "I'm a complete beginner. Can I really learn AI skills that pay?",
        answer:
          "Yes. The AI Automation track needs no coding at all, and it's often the fastest route to your first paid project. If you can use web apps and spreadsheets, you can start. Take the quick path-finder quiz on the home page for a personalised recommendation.",
      },
      {
        question: "Which skill should I start with?",
        answer:
          "No coding experience: start with AI Automation. Comfortable coding: start with AI Software Development, then add AI Agents. Not sure? Book a free discovery call and we'll pick the right path together.",
      },
      {
        question: "How much can I earn?",
        answer:
          "Honestly, it depends on you — your skills, the time you put in, your market and how you sell. We don't promise income. What we do is teach in-demand skills, help you build a portfolio, and show you how to package and price services and products so you can create more than one income stream.",
      },
      {
        question: "Where are students based? Can I join from Africa or Asia?",
        answer:
          "Everything is online, so you can join from anywhere. So far, students have been taught through online and virtual community courses across Canada, the USA, the UK and Europe, and AIMoniPoint is actively growing across Africa, Asia and North America.",
      },
    ],
  },
  {
    id: "courses",
    title: "Courses",
    items: [
      {
        question: "Are courses self-paced or live?",
        answer:
          "Most courses are available self-paced, and several also run as live online cohorts with weekly classes. Each course page shows the available formats.",
      },
      {
        question: "Do courses teach how to find clients?",
        answer:
          "Yes. The core courses include lessons on packaging, pricing and selling your new skill to small and medium businesses, alongside the technical training.",
      },
      {
        question: "Do I get a certificate?",
        answer: "Yes — you receive a certificate of completion when you finish a course and its projects.",
      },
      {
        question: "How long do I have access to a course?",
        answer: "[Access period — e.g. access for as long as the course is offered, including updates. Replace with your actual policy.]",
      },
    ],
  },
  {
    id: "training",
    title: "Mentorship & cohorts",
    items: [
      {
        question: "How does 1-on-1 mentorship work?",
        answer:
          "We start with a discovery call, then agree a personal skills and income roadmap. You get live video sessions, reviews of your projects, help packaging and pricing your services, and async support between sessions.",
      },
      {
        question: "Can you train our community or group?",
        answer:
          "Yes. Daniel has taught communities across Canada, the USA, the UK and Europe online, and welcomes communities across Africa, Asia, North America and beyond. Workshops and cohorts run live online.",
      },
      {
        question: "Do you offer corporate training?",
        answer:
          "Not at the moment — AIMoniPoint currently focuses on individuals, communities and small and medium businesses. Corporate programmes are planned for the future; you're welcome to register your interest via the contact form.",
      },
    ],
  },
  {
    id: "services",
    title: "Services for businesses",
    items: [
      {
        question: "What size of business do you work with?",
        answer:
          "Small and medium businesses (SMBs) — from solo founders and local shops to growing teams — anywhere in the world, delivered online.",
      },
      {
        question: "How do projects start?",
        answer:
          "Send an enquiry or book a discovery call. You'll receive a short written scope with timeline and price before any work begins.",
      },
      {
        question: "How fast can you deliver?",
        answer:
          "Most automations take 1–3 weeks, AI agents 2–5 weeks and AI apps 2–6 weeks, depending on scope. We focus on launching something useful quickly and improving it from there.",
      },
      {
        question: "Can I learn to do this myself instead?",
        answer:
          "Absolutely — that's what AIMoniPoint is built for. Every service links to the course that teaches the same skill.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & currencies",
    items: [
      {
        question: "Which currencies do you accept?",
        answer:
          "Prices are shown in Canadian dollars (CAD), US dollars (USD), British pounds (GBP) and euros (EUR). If you're elsewhere — for example in Africa or Asia — use USD. Switch currency with the selector next to any price.",
      },
      {
        question: "How do I pay for a course?",
        answer: "Course enrolment is handled securely through our course store. Click 'Enrol now' on any course page to check out.",
      },
      {
        question: "Do prices include tax?",
        answer: "[Tax policy — e.g. whether GST/HST, VAT or sales tax is added at checkout. Replace with your actual policy.]",
      },
      {
        question: "Do you offer payment plans or regional pricing?",
        answer: "[Payment plan / regional pricing policy — replace.] For group and community pricing, please get in touch.",
      },
    ],
  },
  {
    id: "refunds",
    title: "Refunds",
    items: [
      {
        question: "What is your refund policy for courses?",
        answer: "[Refund window — e.g. 14 days with less than X% of content completed. Replace.] See the full Refund Policy for details.",
      },
      {
        question: "Can I cancel or reschedule a mentorship session?",
        answer: "[Rescheduling policy — e.g. free rescheduling with 24 hours' notice. Replace.]",
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
const pick = (group: string, i: number) => faqGroups.find((g) => g.id === group)!.items[i];
export const homeFaqs = [pick("getting-started", 0), pick("getting-started", 2), pick("getting-started", 3), pick("courses", 1), pick("services", 3)];
