"use client";

import type { Price as PriceType } from "@/content/types";
import { priceIn, useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

/** Displays a stored price in the visitor's selected currency. */
export function Price({
  price,
  compareAt,
  suffix,
  className,
}: {
  price: PriceType;
  compareAt?: PriceType;
  suffix?: string;
  className?: string;
}) {
  const currency = useCurrency();
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="font-display font-bold">{priceIn(price, currency)}</span>
      {compareAt && (
        <s className="text-sm text-muted-foreground">
          <span className="sr-only">Was </span>
          {priceIn(compareAt, currency)}
        </s>
      )}
      {suffix && <span className="text-sm font-normal text-muted-foreground">{suffix}</span>}
    </span>
  );
}
