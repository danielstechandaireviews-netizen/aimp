"use client";

import { currencies, setCurrency, useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

/** Segmented control for choosing the display currency. Persists in localStorage. */
export function CurrencySwitcher({ className, compact = false }: { className?: string; compact?: boolean }) {
  const current = useCurrency();

  return (
    <div
      role="radiogroup"
      aria-label="Display prices in"
      className={cn("inline-flex items-center rounded-full border bg-foreground/5 p-0.5 text-xs", className)}
    >
      {currencies.map((c) => {
        const active = c.code === current;
        return (
          <button
            key={c.code}
            type="button"
            role="radio"
            aria-checked={active}
            title={c.label}
            onClick={() => setCurrency(c.code)}
            className={cn(
              "rounded-full font-semibold transition-colors",
              compact ? "px-2 py-1" : "px-3 py-1.5",
              active ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {c.code}
          </button>
        );
      })}
    </div>
  );
}
