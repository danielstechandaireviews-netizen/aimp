import { cn } from "@/lib/utils";

/**
 * Subtle fade-up as the element scrolls into view.
 *
 * Uses CSS scroll-driven animations (see `.reveal` in globals.css) so it costs
 * no JavaScript or hydration time. Browsers without support, and visitors who
 * prefer reduced motion, simply see the content without animation.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Stagger offset in seconds-equivalent (0.1 ≈ a slightly later start). */
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("reveal", className)} style={{ "--reveal-delay": `${Math.round(delay * 100)}%` } as React.CSSProperties}>
      {children}
    </div>
  );
}
