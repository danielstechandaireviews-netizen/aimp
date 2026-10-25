import Image from "next/image";
import { Quote } from "lucide-react";
import * as Flags from "country-flag-icons/react/3x2";
import type { Testimonial } from "@/content/types";
import { cn } from "@/lib/utils";
import { PlaceholderBadge } from "./placeholder-badge";

type FlagCode = keyof typeof Flags;

export function TestimonialCard({ testimonial: t, className }: { testimonial: Testimonial; className?: string }) {
  const initials = t.name
    .replace(/[[\]]/g, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const Flag = t.country ? Flags[t.country as FlagCode] : undefined;

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-card p-6",
        t.placeholder && "border-dashed",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Quote aria-hidden className="size-6 text-brand-text" />
        {t.placeholder ? <PlaceholderBadge label="Placeholder testimonial" /> : (
          <span className="text-xs text-muted-foreground">{t.context}</span>
        )}
      </div>
      <blockquote className={cn("mt-4 flex-1 text-base leading-relaxed", t.placeholder && "text-muted-foreground italic")}>
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {t.avatar ? (
          <Image src={t.avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
        ) : (
          <span aria-hidden className="inline-flex size-10 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand-text">
            {initials || "?"}
          </span>
        )}
        <span className="text-sm">
          <span className="block font-semibold">{t.name}</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            {t.role}
            {t.location && (
              <>
                <span aria-hidden>·</span>
                {Flag && <Flag aria-hidden className="h-3 w-[18px] shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" />}
                {t.location}
              </>
            )}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
