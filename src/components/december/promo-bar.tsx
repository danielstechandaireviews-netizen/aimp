"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bootcamp, currentCohort } from "@/content/bootcamps";

const subscribe = () => () => {};
const isRunning = () => Date.now() < new Date(currentCohort.promoEndsAt).getTime();

/** Site-wide strip promoting the current cohort. Hides itself once registration has passed. */
export function PromoBar() {
  const running = useSyncExternalStore(subscribe, isRunning, () => true);
  const pathname = usePathname();
  if (!running || pathname.startsWith(currentCohort.path) || pathname.startsWith("/admin")) return null;

  return (
    <Link
      href={`${currentCohort.path}?ref=site-bar`}
      className="block bg-cta px-4 py-2 text-center text-sm font-semibold text-cta-foreground hover:opacity-90"
    >
      {currentCohort.month} cohort starts {currentCohort.shortDates.split(" – ")[0]}
      <span className="hidden sm:inline">: any AI skill route for ${bootcamp.price.USD} USD</span>.{" "}
      <span className="underline underline-offset-2">Register now</span>
    </Link>
  );
}
