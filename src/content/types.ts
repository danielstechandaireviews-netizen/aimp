/**
 * Shared content types. Every data file in /src/content is typed against
 * these so the editor (and the build) catches mistakes early.
 */

export type Currency = "CAD" | "USD" | "GBP" | "EUR";

/** Prices are stored per currency — no live conversion. */
export type Price = Record<Currency, number>;

export type Level = "Beginner" | "Intermediate" | "Advanced";
export type CourseFormat = "Self-paced" | "Live cohort" | "1-on-1";

export type IconName =
  | "code"
  | "workflow"
  | "bot"
  | "sparkles"
  | "database"
  | "brain"
  | "briefcase"
  | "landmark"
  | "radio-tower"
  | "fuel"
  | "shield"
  | "compass"
  | "users"
  | "building"
  | "user"
  | "network"
  | "kanban"
  | "rocket"
  | "repeat"
  | "package"
  | "store"
  | "graduation"
  | "layout";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AiArea {
  slug: string;
  title: string;
  shortTitle?: string;
  icon: IconName;
  /** Core pillars (the three money-making skill tracks) are featured first. */
  pillar: boolean;
  kind: "pillar" | "discipline";
  tagline: string;
  summary: string;
  overview: string[];
  outcomes: string[];
  tools: string[];
  useCases: { title: string; description: string }[];
  /** Ways a learner can earn with this skill (pillars only). */
  incomeStreams?: string[];
  relatedCourses: string[]; // course slugs
  relatedServices: string[]; // service slugs
}

export interface Lesson {
  title: string;
  duration?: string;
}

export interface CourseModule {
  title: string;
  summary?: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  area: string; // AiArea slug
  level: Level;
  formats: CourseFormat[];
  duration: string;
  price: Price;
  /** Optional "was" price for showing a discount. */
  compareAtPrice?: Price;
  /** Selfany checkout / product link for this course. */
  purchaseUrl: string;
  /** null until real reviews exist — the UI shows "New course" instead. */
  rating: { value: number; count: number } | null;
  featured: boolean;
  description: string;
  whoItsFor: string[];
  outcomes: string[];
  /** Ways graduates can earn with these skills (no income figures). */
  earnWith: string[];
  prerequisites: string[];
  curriculum: CourseModule[];
  projects: { title: string; description: string }[];
  tools: string[];
  faqs: FaqItem[];
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  summary: string;
  problem: string;
  solution: string;
  examples: string[];
  deliverables: string[];
  timeline: string;
  idealFor: string;
  /** Indicative starting price. Set to null to show "Custom quote". */
  startingAt: Price | null;
  /** The course that teaches learners to deliver this same service. */
  learnCourse: string; // course slug
}

export interface PricingTier {
  name: string;
  description: string;
  /** null → "Custom quote" */
  price: Price | null;
  priceSuffix?: string;
  features: string[];
  highlighted?: boolean;
  cta: { label: string; href: string };
}

export interface TrainingOffering {
  id: string;
  title: string;
  icon: IconName;
  summary: string;
  description: string;
  benefits: string[];
  tiers: PricingTier[];
}

export type ProjectService = "AI Software" | "AI Automation" | "AI Agents";
export type ProjectKind = "Client project" | "Student build";

export interface Project {
  slug: string;
  /** Set to false once replaced with a real project. */
  placeholder: boolean;
  title: string;
  kind: ProjectKind;
  service: ProjectService;
  /** Business type, e.g. "E-commerce", "Clinic", "Real estate". */
  sector: string;
  clientType: string;
  summary: string;
  challenge: string;
  solution: string;
  techStack: string[];
  role: string;
  results: { metric: string; label: string }[];
  /** Optional image paths in /public; a generated visual is used when empty. */
  images: { src: string; alt: string }[];
}

export interface Testimonial {
  /** Set to false once replaced with a real, consented testimonial. */
  placeholder: boolean;
  quote: string;
  name: string;
  role: string;
  location?: string;
  context: "Course" | "Mentorship" | "Community" | "Services";
  avatar?: string;
}

export interface Partner {
  name: string;
  logo?: string; // path in /public
  url?: string;
  placeholder: boolean;
}

export interface IncomeStream {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  /** Pillar slugs whose skills power this stream. */
  skills: string[];
  examples: string[];
  model: "One-off projects" | "Recurring" | "Passive / scalable";
}
