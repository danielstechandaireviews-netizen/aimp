import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaBannerProps {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
}

export function CtaBanner({
  title = "Ready to turn AI skills into income?",
  description = "Book a free 30-minute discovery call. We'll look at where you are, the time you have, and the fastest practical path to your first AI income stream.",
  primary = { label: "Book a free discovery call", href: "/contact#book" },
  secondary = { label: "Find my path (quiz)", href: "/#path-quiz" },
  className,
}: CtaBannerProps) {
  const isBooking = primary.href.includes("#book");
  return (
    <section className={cn("container-page py-16 md:py-24", className)}>
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand/25 via-card to-cta/20 px-6 py-12 ring-1 ring-border sm:px-12 md:py-16">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-60" />
        <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,var(--glow-cta),transparent)]" />
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cta" size="xl">
              <Link href={primary.href}>
                {isBooking && <CalendarDays aria-hidden />}
                {primary.label}
                {!isBooking && <ArrowRight aria-hidden />}
              </Link>
            </Button>
            {secondary && (
              <Button asChild variant="glass" size="xl">
                <Link href={secondary.href}>
                  {secondary.label}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
