import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee (CSS transform only — runs on the compositor).
 * Pauses on hover; stops for reduced-motion users. The duplicate copy is hidden
 * from assistive technology.
 */
export function Marquee({ items, className, reverse = false }: { items: React.ReactNode[]; className?: string; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("fade-x group overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
