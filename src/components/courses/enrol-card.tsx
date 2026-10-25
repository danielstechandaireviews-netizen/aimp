import Link from "next/link";
import { CalendarDays, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { isPlaceholder } from "@/content/site";
import type { Course } from "@/content/types";
import { lessonCount } from "@/content/courses";
import { Button } from "@/components/ui/button";
import { CurrencySwitcher } from "@/components/shared/currency-switcher";
import { Price } from "@/components/shared/price";
import { cn } from "@/lib/utils";

/** Price + enrol call-to-action. Purchase happens on the external Selfany store. */
export function EnrolCard({ course, className }: { course: Course; className?: string }) {
  const placeholder = isPlaceholder(course.purchaseUrl);

  return (
    <div className={cn("rounded-3xl border bg-card p-6 glow-ring sm:p-7", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">Course price</p>
        <CurrencySwitcher compact />
      </div>
      <Price price={course.price} compareAt={course.compareAtPrice} className="mt-3 text-4xl" />

      {placeholder ? (
        <>
          <Button variant="cta" size="xl" className="mt-6 w-full" disabled aria-describedby={`${course.slug}-enrol-note`}>
            Enrol now
          </Button>
          <p id={`${course.slug}-enrol-note`} className="mt-2 text-xs text-muted-foreground">
            Checkout link not set yet — add this course&apos;s <code>purchaseUrl</code> in src/content/courses.ts.
          </p>
        </>
      ) : (
        <Button asChild variant="cta" size="xl" className="mt-6 w-full">
          <a href={course.purchaseUrl} target="_blank" rel="noopener">
            Enrol now <ExternalLink aria-hidden />
            <span className="sr-only">(opens secure checkout in a new tab)</span>
          </a>
        </Button>
      )}
      <Button asChild variant="outline" size="lg" className="mt-3 w-full">
        <Link href="/contact?topic=courses#book">
          <CalendarDays aria-hidden /> Ask a question first
        </Link>
      </Button>

      <ul className="mt-6 space-y-2.5 text-sm">
        {[
          `${course.curriculum.length} modules · ${lessonCount(course)} lessons`,
          course.duration,
          `${course.projects.length} hands-on projects`,
          `Formats: ${course.formats.join(", ")}`,
          "Certificate of completion",
        ].map((item) => (
          <li key={item} className="flex gap-2">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-text" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-center gap-2 border-t pt-5 text-xs text-muted-foreground">
        <ShieldCheck aria-hidden className="size-4 text-brand-text" />
        Secure checkout. See the{" "}
        <Link href="/legal/refunds" className="underline underline-offset-2 hover:text-foreground">
          refund policy
        </Link>
        .
      </p>
    </div>
  );
}
