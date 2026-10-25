import { Suspense } from "react";
import { areas } from "@/content/areas";
import { courses } from "@/content/courses";
import { CourseCatalog, type CatalogItem } from "@/components/courses/course-catalog";
import { BootcampSection } from "@/components/sections/bootcamp-section";
import { CourseCard } from "@/components/shared/course-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { CurrencySwitcher } from "@/components/shared/currency-switcher";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Courses — Learn AI Skills That Pay",
  description:
    "Practical, project-based AI courses in AI Automation, AI Agents and AI Software Development — with lessons on selling your skills to small businesses. Self-paced, live cohort and 1-on-1.",
  path: "/courses",
  eyebrow: "Courses",
});

export default function CoursesPage() {
  const items: CatalogItem[] = courses.map((c) => ({
    slug: c.slug,
    title: c.title,
    area: c.area,
    level: c.level,
    formats: c.formats,
    searchText: [c.title, c.subtitle, c.description, ...c.tools].join(" ").toLowerCase(),
  }));
  const cards = Object.fromEntries(courses.map((c) => [c.slug, <CourseCard key={c.slug} course={c} />]));
  const usedAreas = new Set(courses.map((c) => c.area));
  const areaOptions = areas
    .filter((a) => usedAreas.has(a.slug))
    .map((a) => ({ value: a.slug, label: a.shortTitle ?? a.title }));

  return (
    <>
      <PageHero
        eyebrow="Courses"
        title={
          <>
            AI courses that get you <span className="text-gradient">earning</span>
          </>
        }
        description="Project-based courses in AI Automation, AI Agents and AI Software Development — each one teaches a skill businesses pay for, and how to sell it."
        breadcrumbs={[{ name: "Courses", path: "/courses" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">Show prices in</span>
          <CurrencySwitcher />
        </div>
      </PageHero>

      <BootcampSection className="border-b" />

      <section className="section container-page">
        <Suspense
          fallback={
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((c) => (
                <li key={c.slug}>{cards[c.slug]}</li>
              ))}
            </ul>
          }
        >
          <CourseCatalog items={items} cards={cards} areaOptions={areaOptions} />
        </Suspense>
      </section>

      <CtaBanner
        title="Not sure which course to pick?"
        description="Take the 60-second path-finder quiz, or tell us your goals on a free discovery call."
        primary={{ label: "Take the quiz", href: "/#path-quiz" }}
        secondary={{ label: "Get the free AI Career Roadmap", href: "/free-resources" }}
      />
    </>
  );
}
