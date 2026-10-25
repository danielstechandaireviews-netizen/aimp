import type { IncomeStream, Price } from "./types";

/**
 * Income streams learners can build with AI skills (shown on /income-streams and the home page).
 * `skills` reference pillar slugs in areas.ts.
 *
 * Deliberately no income figures here — earnings depend on the individual.
 */
export const incomeStreams: IncomeStream[] = [
  {
    id: "freelance",
    title: "Freelance AI projects",
    icon: "briefcase",
    model: "One-off projects",
    description: "Build chatbots, automations and agents for small businesses, project by project.",
    skills: ["ai-automation", "agentic-ai", "ai-software-development"],
    examples: ["Website AI assistant", "Invoice automation", "Booking agent"],
  },
  {
    id: "retainers",
    title: "Monthly retainers & care plans",
    icon: "repeat",
    model: "Recurring",
    description: "Maintain, monitor and improve the AI you build — for a monthly fee. Predictable, recurring income.",
    skills: ["ai-automation", "agentic-ai", "ai-software-development"],
    examples: ["Automation maintenance", "Agent care plan", "Hosting & support"],
  },
  {
    id: "agency",
    title: "Your own AI agency",
    icon: "building",
    model: "Recurring",
    description: "Package your services, build a small team and serve more businesses than you could alone.",
    skills: ["ai-automation", "agentic-ai"],
    examples: ["AI automation agency", "Productised 'AI receptionist' service", "White-label builds"],
  },
  {
    id: "templates",
    title: "Templates & digital products",
    icon: "package",
    model: "Passive / scalable",
    description: "Turn your best workflows, prompts and agents into templates people can buy again and again.",
    skills: ["ai-automation", "agentic-ai"],
    examples: ["n8n workflow templates", "Prompt packs", "Agent starter kits"],
  },
  {
    id: "saas",
    title: "Your own AI micro-SaaS",
    icon: "layout",
    model: "Passive / scalable",
    description: "Build a small AI product that solves one problem well and earns subscription income.",
    skills: ["ai-software-development", "agentic-ai"],
    examples: ["AI quote generator", "Niche writing tool", "Industry-specific assistant"],
  },
  {
    id: "jobs",
    title: "AI roles & contracts",
    icon: "graduation",
    model: "Recurring",
    description: "Use your portfolio to land AI developer, automation or AI operations roles and contracts — remote or local.",
    skills: ["ai-software-development", "ai-automation", "agentic-ai"],
    examples: ["AI automation specialist", "AI developer", "AI operations contractor"],
  },
];

/**
 * Income calculator — the visitor sets every number. These are only
 * starting EXAMPLES (per currency), not estimates or promises.
 */
export interface CalculatorStream {
  id: string;
  label: string;
  unitLabel: string; // e.g. "projects / month"
  priceLabel: string; // e.g. "average price per project"
  maxUnits: number;
  defaultUnits: number;
  defaultPrice: Price;
  maxPrice: Price;
  recurring: boolean;
}

export const calculatorStreams: CalculatorStream[] = [
  {
    id: "projects",
    label: "Freelance projects",
    unitLabel: "projects per month",
    priceLabel: "average price per project",
    maxUnits: 10,
    defaultUnits: 1,
    defaultPrice: { CAD: 1000, USD: 750, GBP: 600, EUR: 700 },
    maxPrice: { CAD: 10000, USD: 7500, GBP: 6000, EUR: 7000 },
    recurring: false,
  },
  {
    id: "retainers",
    label: "Monthly retainers",
    unitLabel: "retainer clients",
    priceLabel: "monthly fee per client",
    maxUnits: 20,
    defaultUnits: 2,
    defaultPrice: { CAD: 300, USD: 220, GBP: 180, EUR: 200 },
    maxPrice: { CAD: 2500, USD: 2000, GBP: 1500, EUR: 1800 },
    recurring: true,
  },
  {
    id: "templates",
    label: "Templates & digital products",
    unitLabel: "sales per month",
    priceLabel: "price per template",
    maxUnits: 100,
    defaultUnits: 5,
    defaultPrice: { CAD: 50, USD: 39, GBP: 29, EUR: 35 },
    maxPrice: { CAD: 400, USD: 300, GBP: 250, EUR: 280 },
    recurring: false,
  },
  {
    id: "saas",
    label: "AI micro-SaaS",
    unitLabel: "paying subscribers",
    priceLabel: "monthly subscription",
    maxUnits: 500,
    defaultUnits: 0,
    defaultPrice: { CAD: 25, USD: 19, GBP: 15, EUR: 18 },
    maxPrice: { CAD: 200, USD: 150, GBP: 120, EUR: 140 },
    recurring: true,
  },
];

export const learnBuildEarn = [
  {
    step: "Learn",
    title: "Master an in-demand AI skill",
    description:
      "Pick a track — AI Automation, AI Agents or AI Software Development — and learn it hands-on, with real tools and real projects.",
    points: ["Beginner-friendly paths", "Self-paced or live cohorts", "1-on-1 mentorship available"],
    href: "/courses",
    cta: "Explore courses",
  },
  {
    step: "Build",
    title: "Build a portfolio that sells",
    description:
      "Every course ends with projects small businesses actually need — chatbots, automations and agents you can demo to clients and employers.",
    points: ["Client-ready projects", "Code & workflow reviews", "Templates you can reuse"],
    href: "/projects",
    cta: "See student builds",
  },
  {
    step: "Earn",
    title: "Turn skills into income streams",
    description:
      "Package your skills as services for small and medium businesses, add recurring retainers, sell templates — and stack multiple streams of income.",
    points: ["Pricing & packaging lessons", "Finding your first clients", "Recurring & passive income ideas"],
    href: "/income-streams",
    cta: "Explore income streams",
  },
];
