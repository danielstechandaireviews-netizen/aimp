"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cycles through words with a slide-up transition.
 * Screen readers get the full list once; reduced-motion users see the first word only.
 */
export function TextRotator({ words, interval = 2400, className }: { words: string[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cn("relative inline-grid align-bottom", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((w, i) => (
        <span
          key={w}
          aria-hidden
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap transition-all ease-out",
            // Outgoing word fades quickly; the incoming one waits for it so they never overlap.
            i === index
              ? "translate-y-0 opacity-100 delay-200 duration-500"
              : i === (index - 1 + words.length) % words.length
                ? "-translate-y-3 opacity-0 duration-200"
                : "translate-y-3 opacity-0 duration-0",
          )}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
