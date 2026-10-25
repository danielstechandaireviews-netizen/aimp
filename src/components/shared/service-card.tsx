import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/types";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const Icon = icons[service.icon];
  return (
    <article className={cn("card-interactive group relative flex h-full flex-col rounded-2xl border bg-card p-6", className)}>
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand-text">
        <Icon aria-hidden className="size-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">
        <Link href={`/services#${service.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-brand-text">
        Learn more <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
