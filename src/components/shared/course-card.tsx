import Link from "next/link";
import { ArrowRight, Clock, Signal, Star } from "lucide-react";
import { getArea } from "@/content/areas";
import type { Course } from "@/content/types";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Price } from "./price";

export function CourseCard({ course, className }: { course: Course; className?: string }) {
  const area = getArea(course.area);
  const Icon = area ? icons[area.icon] : null;

  return (
    <article
      className={cn(
        "card-interactive group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {area && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand-text">
            {Icon && <Icon aria-hidden className="size-3.5" />}
            {area.shortTitle ?? area.title}
          </span>
        )}
        <span className="text-xs text-muted-foreground">
          {course.rating ? (
            <span className="inline-flex items-center gap-1">
              <Star aria-hidden className="size-3.5 fill-cta text-cta" />
              {course.rating.value.toFixed(1)} ({course.rating.count})
            </span>
          ) : (
            <span title="Ratings appear once verified reviews are added">New course</span>
          )}
        </span>
      </div>

      <h3 className="mt-4 text-lg leading-snug font-semibold">
        <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {course.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{course.subtitle}</p>

      <dl className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Level</dt>
          <Signal aria-hidden className="size-3.5" />
          <dd>{course.level}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Duration</dt>
          <Clock aria-hidden className="size-3.5" />
          <dd>{course.duration}</dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {course.formats.map((f) => (
          <span key={f} className="rounded-md border px-2 py-0.5 text-[11px] text-muted-foreground">
            {f}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between pt-6">
        <Price price={course.price} compareAt={course.compareAtPrice} className="text-xl" />
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-text">
          View course
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
