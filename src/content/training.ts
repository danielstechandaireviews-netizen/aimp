import type { TrainingOffering } from "./types";

/**
 * Mentorship & cohort offerings on /training. All prices are SAMPLE PRICES — replace.
 * Set `price: null` on a tier to show "Custom quote".
 */
export const trainingOfferings: TrainingOffering[] = [
  {
    id: "mentorship",
    title: "1-on-1 AI Income Mentorship",
    icon: "user",
    summary: "A personal roadmap from learning AI to earning with it — with live sessions, code reviews and business guidance.",
    description:
      "Work directly with Daniel on a plan built around your background, time and income goals — whether that's your first freelance AI client, a monthly retainer business, an AI product, or a new AI role.",
    benefits: [
      "Personal AI skills & income roadmap",
      "Live 1-on-1 video sessions",
      "Code, workflow and project reviews",
      "Help packaging and pricing your AI services",
      "Portfolio, profile and pitch feedback",
      "Async support between sessions",
    ],
    tiers: [
      {
        name: "Single Session",
        description: "A focused 60-minute session for a specific question, review or plan.",
        price: { CAD: 199, USD: 149, GBP: 119, EUR: 139 },
        priceSuffix: "/ session",
        features: ["60-minute live call", "Session recording", "Written action plan", "Follow-up resources"],
        cta: { label: "Book a session", href: "/contact?topic=mentorship" },
        purchaseUrl: "[SELFANY_URL_MENTORSHIP_SINGLE]",
      },
      {
        name: "4-Week Sprint",
        description: "Build momentum: learn a skill and ship a real project.",
        price: { CAD: 699, USD: 519, GBP: 409, EUR: 479 },
        priceSuffix: "/ 4 weeks",
        features: ["4 × 60-minute sessions", "Personal roadmap", "Project & code reviews", "Async chat support"],
        highlighted: true,
        cta: { label: "Apply now", href: "/training#enquire" },
        purchaseUrl: "[SELFANY_URL_MENTORSHIP_SPRINT]",
      },
      {
        name: "12-Week Income Accelerator",
        description: "From skills to your first paying clients and income streams.",
        price: { CAD: 1899, USD: 1399, GBP: 1099, EUR: 1299 },
        priceSuffix: "/ 12 weeks",
        features: [
          "12 × 60-minute sessions",
          "Skills + income-stream plan",
          "Portfolio projects you can sell",
          "Service packaging, pricing & outreach",
          "Priority async support",
          "Access to selected courses",
        ],
        cta: { label: "Apply now", href: "/training#enquire" },
        purchaseUrl: "[SELFANY_URL_MENTORSHIP_ACCELERATOR]",
      },
    ],
  },
  {
    id: "community",
    title: "Community & Cohort Training",
    icon: "users",
    summary: "Live, online AI training for communities, groups and bootcamps — anywhere in the world.",
    description:
      "Daniel has taught AI skills to communities across Canada, the USA, the UK and Europe through online and virtual courses — and is now bringing the same practical, income-focused training to communities across Africa, Asia and North America.",
    benefits: [
      "Live online workshops and multi-week cohorts",
      "Hands-on, project-based sessions",
      "Content tailored to your members' level",
      "How to turn the skills into income",
      "Community discounts on courses",
      "Certificates of completion",
    ],
    tiers: [
      {
        name: "Community Workshop",
        description: "A 2–3 hour live, hands-on online workshop on a chosen AI skill.",
        price: null,
        features: ["Live, interactive session", "Hands-on exercises", "Slides and resources", "Q&A"],
        cta: { label: "Enquire", href: "/training#enquire" },
      },
      {
        name: "Cohort Programme",
        description: "A 4–8 week live cohort with projects, support and accountability.",
        price: null,
        features: ["Weekly live classes", "Guided projects", "Community support channel", "Certificates"],
        highlighted: true,
        cta: { label: "Enquire", href: "/training#enquire" },
      },
    ],
  },
];

export const howItWorks = [
  { title: "Discovery call", description: "A free call about your goals, background and the time you have." },
  { title: "Your plan", description: "A clear skills + income roadmap with milestones." },
  { title: "Learn", description: "Live, practical sessions focused on skills you can use straight away." },
  { title: "Build", description: "Real projects that become your portfolio — and your first offers." },
  { title: "Earn", description: "Package, price and pitch your AI services, with ongoing support." },
];
