import type { Currency } from "./types";

/**
 * Global site configuration. Values in [SQUARE_BRACKETS] are placeholders —
 * see PLACEHOLDERS.md for the full list. Secrets never live here; they go in
 * environment variables (see .env.example).
 */
export const siteConfig = {
  name: "AIMoniPoint",
  domain: "aimonipoint.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aimonipoint.com",
  tagline: "Learn AI. Build with AI. Earn with AI.",
  mission:
    "To equip everyday people with the AI hard skills to create multiple streams of income — and to deliver those same AI services to small and medium businesses.",
  description:
    "Learn practical AI skills — AI software development, AI automation and AI agents — and turn them into multiple streams of income. Online courses, mentorship and live cohorts from Daniel Makonor, plus done-for-you AI services for small and medium businesses.",
  locale: "en",

  owner: {
    name: "Daniel Makonor",
    jobTitle: "AI Skill Educator at AIMoniPoint",
    image: "/images/daniel-makonor.jpg",
  },

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "daniel@aimonipoint.com",
    /** WhatsApp in international format, digits only (Nigeria +234). */
    whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348037723164").replace(/\D/g, ""),
    whatsappDisplay: "+234 803 772 3164",
    calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "[CALENDLY_URL]",
  },

  /**
   * Where students have been taught so far (online / virtual community courses)…
   */
  regionsServed: ["Canada", "USA", "UK", "Europe"],
  /** …and where AIMoniPoint is actively growing. Everything is online, so anyone can join. */
  regionsGrowing: ["Africa", "Asia", "North America"],

  /** Leave a value empty ("") to hide that icon everywhere. */
  socials: {
    linkedin: "[LINKEDIN_URL]",
    youtube: "[YOUTUBE_URL]",
    x: "[X_URL]",
    instagram: "[INSTAGRAM_URL]",
    github: "[GITHUB_URL]",
  },

  /** Store/checkout home — individual course links live in courses.ts */
  storeUrl: "[SELFANY_STORE_URL]",

  defaultCurrency: "USD" as Currency,

  features: {
    /** Floating chat assistant (pay on Selfany or chat on WhatsApp). */
    chatWidget: true,
    whatsappMessage: "Hi Daniel, I found AIMoniPoint and I'd like to ask about…",
  },

  leadMagnet: {
    title: "The AI Career Roadmap",
    description:
      "A practical, step-by-step roadmap for building AI skills that pay — AI software development, AI automation or AI agents — with the tools, portfolio projects and income streams to focus on at each stage.",
    file: "/downloads/ai-career-roadmap.pdf",
  },
} as const;

/** wa.me link to chat with Daniel, optionally with a pre-filled message. */
export function whatsappUrl(message: string = siteConfig.features.whatsappMessage) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** True when a config value is still an unfilled [PLACEHOLDER]. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

export const mainNav = [
  { label: "AI Skills", href: "/ai-areas", mega: "areas" as const },
  { label: "Courses", href: "/courses", mega: "courses" as const },
  { label: "Income Streams", href: "/income-streams" },
  { label: "Mentorship", href: "/training" },
  { label: "For Businesses", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const footerNav = {
  Learn: [
    { label: "All courses", href: "/courses" },
    { label: "AI skill tracks", href: "/ai-areas" },
    { label: "Income streams", href: "/income-streams" },
    { label: "Free AI Career Roadmap", href: "/free-resources" },
    { label: "Blog", href: "/blog" },
  ],
  Grow: [
    { label: "1-on-1 mentorship", href: "/training#mentorship" },
    { label: "Community & cohorts", href: "/training#community" },
    { label: "Projects & student builds", href: "/projects" },
  ],
  "For businesses": [
    { label: "Rapid AI software", href: "/services#rapid-ai-software-development" },
    { label: "AI automation", href: "/services#ai-automation" },
    { label: "AI agents", href: "/services#ai-agents" },
    { label: "Request a quote", href: "/services#enquire" },
  ],
  Company: [
    { label: "About Daniel", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ],
};
