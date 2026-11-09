"use client";

import { useSyncExternalStore } from "react";
import { currentCohort } from "@/content/bootcamps";

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const secondsNow = () => Math.floor(Date.now() / 1000);
const startSeconds = Math.floor(new Date(currentCohort.startsAt).getTime() / 1000);

/** Live countdown to the cohort start. Ticks only in the browser so static HTML never goes stale. */
export function Countdown() {
  const now = useSyncExternalStore(subscribe, secondsNow, () => 0);
  if (now >= startSeconds) return null;

  const left = startSeconds - now;
  const units = [
    { label: "Days", value: Math.floor(left / 86400) },
    { label: "Hours", value: Math.floor((left % 86400) / 3600) },
    { label: "Mins", value: Math.floor((left % 3600) / 60) },
    { label: "Secs", value: left % 60 },
  ];

  return (
    <div role="timer" aria-label="Time until the cohort starts" className="flex gap-3">
      {units.map((u) => (
        <div key={u.label} className="w-18 rounded-2xl border bg-card py-3 text-center sm:w-20">
          <p className="font-display text-3xl font-bold tabular-nums">{now === 0 ? "--" : String(u.value).padStart(2, "0")}</p>
          <p className="text-xs text-muted-foreground">{u.label}</p>
        </div>
      ))}
    </div>
  );
}
