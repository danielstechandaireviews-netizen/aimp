import Link from "next/link";
import { CalendarDays, ExternalLink } from "lucide-react";
import { bootcamp, bootcampMonthNames } from "@/content/bootcamps";
import { getCourse } from "@/content/courses";
import { isPlaceholder, siteConfig, whatsappUrl } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/shared/price";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import { NextCohort } from "./next-cohort";

/** Quarterly $200 bootcamps for the three flagship courses. */
export function BootcampSection({ className }: { className?: string }) {
  const months = bootcampMonthNames.join(", ").replace(/, ([^,]*)$/, " and $1");

  return (
    <section id="bootcamps" aria-labelledby="bootcamps-title" className={cn("section container-page scroll-mt-24", className)}>
      <SectionHeading
        id="bootcamps-title"
        eyebrow="Quarterly bootcamps"
        title={
          <>
            1-month live bootcamps for <span className="text-gradient">$200</span>
          </>
        }
        description={`Learn a skill that pays in one focused month with a live cohort. Bootcamps run every ${months}.`}
      />
      <p className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-sm">
        <CalendarDays aria-hidden className="size-4 text-brand-text" />
        Next cohort: <strong className="font-semibold"><NextCohort fallback={bootcampMonthNames.join(" · ")} /></strong>
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {bootcamp.courses.map((b) => {
          const course = getCourse(b.slug);
          if (!course) return null;
          const payUrl = !isPlaceholder(b.purchaseUrl) ? b.purchaseUrl : !isPlaceholder(siteConfig.storeUrl) ? siteConfig.storeUrl : null;
          return (
            <li key={b.slug} className="flex flex-col rounded-2xl border bg-card p-6 sm:p-7">
              <p className="text-xs font-semibold tracking-widest text-brand-text uppercase">{b.track}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug">{course.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {bootcamp.duration} · live cohort · {course.projects.length} hands-on projects
              </p>
              <Price price={bootcamp.price} className="mt-5 text-3xl" />
              <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
                {payUrl ? (
                  <Button asChild variant="cta" size="lg" className="w-full">
                    <a href={payUrl} target="_blank" rel="noopener">
                      Join the bootcamp <ExternalLink aria-hidden />
                      <span className="sr-only">(opens secure checkout in a new tab)</span>
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="cta" size="lg" className="w-full">
                    <a href={whatsappUrl(`Hi Daniel, I'd like to join the next ${b.track} bootcamp.`)} target="_blank" rel="noopener noreferrer">
                      Reserve my spot on WhatsApp
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href={`/courses/${course.slug}`}>See what you&apos;ll learn</Link>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
