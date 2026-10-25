import { stats } from "@/content/about";
import { CountUp } from "@/components/interactive/count-up";
import { cn } from "@/lib/utils";

export function StatsBar({ className }: { className?: string }) {
  return (
    <section aria-label="Impact" className={cn("container-page", className)}>
      <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border bg-card shadow-[0_30px_80px_-40px_var(--glow-brand)] lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col gap-1 p-5 sm:p-7",
              i % 2 === 1 && "border-l",
              i >= 2 && "border-t lg:border-t-0",
              i === 2 && "lg:border-l",
            )}
          >
            <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
            <dd className="text-gradient order-1 w-fit font-display text-3xl font-extrabold sm:text-5xl">
              {"count" in s && typeof s.count === "number" ? <CountUp to={s.count} suffix={"suffix" in s ? s.suffix : ""} /> : s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
