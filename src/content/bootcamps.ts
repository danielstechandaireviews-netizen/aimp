import type { Price } from "./types";

export const bootcampRoutes = ["ai-app-development", "ai-automation", "agentic-ai"] as const;
export type BootcampRoute = (typeof bootcampRoutes)[number];

/**
 * Quarterly bootcamps: a 1-month live run of three flagship courses,
 * held in the last month of every quarter (March, June, September, December).
 * - purchaseUrl: the Selfany checkout link for that bootcamp.
 */
export const bootcamp = {
  price: { CAD: 279, USD: 200, GBP: 159, EUR: 189 } as Price,
  duration: "1 month",
  /** Start months (0 = January): the last month of each quarter. */
  months: [2, 5, 8, 11],
  courses: [
    {
      slug: "ai-software-development-bootcamp",
      track: "AI App Development",
      route: "ai-app-development",
      purchaseUrl: "",
      headline: ["Ship a real", "AI app", "before 2027."],
      pitch: "Go from idea to a live AI product in one month, with hands-on projects and live feedback.",
    },
    {
      slug: "ai-automation-masterclass",
      track: "AI Automation",
      route: "ai-automation",
      purchaseUrl: "",
      headline: ["Automate work", "businesses", "pay for."],
      pitch: "Build AI workflows that save real hours, then learn to package and sell them.",
    },
    {
      slug: "agentic-ai-autonomous-agents",
      track: "Agentic AI",
      route: "agentic-ai",
      purchaseUrl: "",
      headline: ["Build AI agents", "that work", "while you sleep."],
      pitch: "Create agents that research, decide and take action, with the guardrails to trust them.",
    },
  ] satisfies { slug: string; track: string; route: BootcampRoute; purchaseUrl: string; headline: string[]; pitch: string }[],
};

/** The cohort currently taking registrations. Each registration is stored under `id`. */
export const currentCohort = {
  id: "2026-12",
  month: "December",
  title: "December 2026 cohort",
  dates: "December 1 – 31, 2026",
  shortDates: "Dec 1 – Dec 31",
  startsAt: "2026-12-01T00:00:00+01:00",
  /** Promo bar disappears after this moment. */
  promoEndsAt: "2026-12-08T00:00:00+01:00",
  path: "/december",
};

export function getBootcampRoute(route: string) {
  return bootcamp.courses.find((c) => c.route === route);
}

export function registrationPath(route: BootcampRoute) {
  return `${currentCohort.path}/${route}`;
}

export const bootcampMonthNames = bootcamp.months.map((m) =>
  new Date(2000, m, 1).toLocaleString("en", { month: "long" }),
);

export function isBootcampCourse(slug: string) {
  return bootcamp.courses.some((c) => c.slug === slug);
}

/** First day of the next bootcamp month. A cohort still counts as upcoming during its first week. */
export function nextBootcampStart(from = new Date()) {
  for (let offset = 0; offset < 13; offset++) {
    const d = new Date(from.getFullYear(), from.getMonth() + offset, 1);
    if (!bootcamp.months.includes(d.getMonth())) continue;
    if (offset === 0 && from.getDate() > 7) continue;
    return d;
  }
  return new Date(from.getFullYear(), from.getMonth() + 1, 1);
}
