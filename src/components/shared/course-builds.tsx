import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { courses } from "@/content/courses";
import { cn } from "@/lib/utils";

/** The portfolio projects students build in each course. With `limit`, shows one per course. */
export function CourseBuilds({ limit, className }: { limit?: number; className?: string }) {
  const builds = limit
    ? courses.slice(0, limit).map((course) => ({ ...course.projects[0], course }))
    : courses.flatMap((course) => course.projects.map((project) => ({ ...project, course })));

  return (
    <ul className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {builds.map((b) => (
        <li key={`${b.course.slug}-${b.title}`} className="flex flex-col rounded-2xl border bg-card p-6">
          <h3 className="text-lg font-semibold">{b.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.description}</p>
          <Link href={`/courses/${b.course.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-text">
            {b.course.title} <ArrowRight aria-hidden className="size-4 shrink-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
