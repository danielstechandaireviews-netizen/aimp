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
    tracksNote: "Every option is available for AI App Development, AI Automation or AI Agents. You choose the track.",
    tiers: [
      {
        name: "Self-paced course",
        description: "Learn on your own schedule with video lessons and hands-on projects.",
        price: { CAD: 139, USD: 100, GBP: 79, EUR: 95 },
        priceSuffix: "/ course",
        features: ["Self-paced video lessons", "Hands-on portfolio projects", "Lessons on selling your skills", "Certificate of completion"],
        cta: { label: "Browse courses", href: "/courses" },
      },
      {
        name: "Interactive Bootcamp",
        description: "One month of live, interactive training with a cohort. Runs every March, June, September and December.",
        price: { CAD: 279, USD: 200, GBP: 159, EUR: 189 },
        priceSuffix: "/ 1 month",
        features: ["1-month live cohort", "Interactive sessions with Daniel", "Hands-on projects with feedback", "Learn alongside other students"],
        highlighted: true,
        cta: { label: "See bootcamp dates", href: "/courses#bootcamps" },
      },
      {
        name: "1-on-1 Mentorship",
        description: "Work directly with Daniel on a plan built around your goals, from skills to your first paying clients.",
        price: { CAD: 479, USD: 350, GBP: 275, EUR: 325 },
        features: [
          "Live 1-on-1 sessions with Daniel",
          "Personal skills & income roadmap",
          "Project & code reviews",
          "Help packaging and pricing your services",
          "Async chat support",
        ],
        cta: { label: "Apply now", href: "/training#enquire" },
        purchaseUrl: "[SELFANY_URL_MENTORSHIP]",
      },
    ],
  },
  {
    id: "community",
    title: "Community & Cohort Training",
    icon: "users",
    summary: "License Daniel's courses for your community, branded with your name and backed by live Q&A, or book live training.",
    description:
      "Community coaches and course platforms worldwide can license Daniel's courses to run on their own platform. Every licence carries your community's brand name and includes live Q&A sessions with Daniel, so your members get real support, not just recordings. Daniel has taught communities across Canada, the USA, the UK and Europe, and is now working with communities across Africa, Asia and North America.",
    benefits: [
      "Courses licensed to run on your own platform",
      "Branded with your community's name",
      "Live Q&A sessions with Daniel included",
      "Pricing negotiable with community coaches",
      "Hands-on, project-based content",
      "Certificates of completion",
    ],
    tiers: [
      {
        name: "Course Licence",
        description: "Run Daniel's courses on your platform, branded for your community, with live Q&A for your members.",
        price: null,
        priceLabel: "Negotiable",
        features: [
          "Licensed for your community's platform",
          "Your community's brand name in the course",
          "Live Q&A sessions with Daniel",
          "Licence covers your members only",
        ],
        highlighted: true,
        cta: { label: "Discuss a licence", href: "/training#enquire" },
      },
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
