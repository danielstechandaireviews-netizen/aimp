import type { Price } from "./types";

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
    { slug: "ai-software-development-bootcamp", track: "AI App Development", purchaseUrl: "[SELFANY_URL_BOOTCAMP_AI_APP]" },
    { slug: "ai-automation-masterclass", track: "AI Automation", purchaseUrl: "[SELFANY_URL_BOOTCAMP_AUTOMATION]" },
    { slug: "agentic-ai-autonomous-agents", track: "Agentic AI", purchaseUrl: "[SELFANY_URL_BOOTCAMP_AGENTIC]" },
  ],
};

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
