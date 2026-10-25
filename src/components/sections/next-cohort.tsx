"use client";

import { useSyncExternalStore } from "react";
import { nextBootcampStart } from "@/content/bootcamps";

const subscribe = () => () => {};
const label = () => nextBootcampStart().toLocaleString("en", { month: "long", year: "numeric" });

/** "December 2026" — computed in the browser so static pages never show a stale date. */
export function NextCohort({ fallback }: { fallback: string }) {
  return <>{useSyncExternalStore(subscribe, label, () => fallback)}</>;
}
