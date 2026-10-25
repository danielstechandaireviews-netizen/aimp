import Link from "next/link";
import { Check } from "lucide-react";
import type { PricingTier } from "@/content/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Price } from "./price";

export function PricingTable({ tiers, className }: { tiers: PricingTier[]; className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-6",
        tiers.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            "relative flex flex-col rounded-2xl border bg-card p-6 sm:p-8",
            tier.highlighted && "border-brand/60 glow-ring",
          )}
        >
          {tier.highlighted && (
            <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
              Most popular
            </span>
          )}
          <h3 className="text-lg font-semibold">{tier.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
          <div className="mt-6 min-h-10 text-3xl">
            {tier.price ? (
              <Price price={tier.price} suffix={tier.priceSuffix} />
            ) : (
              <span className="font-display text-2xl font-bold">Custom quote</span>
            )}
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-text" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant={tier.highlighted ? "cta" : "outline"} size="lg" className="mt-8 w-full">
            <Link href={tier.cta.href}>{tier.cta.label}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
