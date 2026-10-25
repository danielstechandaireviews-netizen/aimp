import { cn } from "@/lib/utils";

/** Visible label for content that must be replaced before launch. */
export function PlaceholderBadge({ label = "Placeholder", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-cta/60 bg-cta/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-foreground uppercase",
        className,
      )}
    >
      {label}
    </span>
  );
}
