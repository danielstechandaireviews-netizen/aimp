"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Accessible tab list (WAI-ARIA tabs pattern): arrow keys / Home / End move
 * between tabs, and each tab controls the panel `${idBase}-panel-${i}`.
 */
export function TabList({
  items,
  active,
  onChange,
  idBase,
  label,
  className,
  tabClassName,
}: {
  items: { label: React.ReactNode; key: string }[];
  active: number;
  onChange: (index: number) => void;
  idBase: string;
  label: string;
  className?: string;
  tabClassName?: (selected: boolean) => string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? active === 0 ? last : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={className}>
      {items.map((item, i) => {
        const selected = i === active;
        return (
          <button
            key={item.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${i}`}
            aria-selected={selected}
            aria-controls={`${idBase}-panel-${i}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(i)}
            className={cn("transition-colors", tabClassName?.(selected))}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
