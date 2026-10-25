"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Lightweight, accessible carousel using native scroll-snap.
 * Items stay in the DOM and are reachable by keyboard/tab and screen readers.
 */
export function CourseCarousel({ children, label }: { children: React.ReactNode; label: string }) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-roledescription="carousel" aria-label={label} className="relative">
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous courses"
          className="inline-flex size-10 items-center justify-center rounded-full border bg-card transition-colors hover:border-brand/50"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next courses"
          className="inline-flex size-10 items-center justify-center rounded-full border bg-card transition-colors hover:border-brand/50"
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
      <ul
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {children}
      </ul>
    </section>
  );
}
