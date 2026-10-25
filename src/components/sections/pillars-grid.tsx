import Link from "next/link";
import { ArrowRight, Coins } from "lucide-react";
import { pillarAreas } from "@/content/areas";
import { icons } from "@/lib/icons";
import { Reveal } from "@/components/shared/reveal";

/** The three money-making skill tracks as cards, each with the income streams it unlocks. */
export function PillarsGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {pillarAreas.map((area, i) => {
        const Icon = icons[area.icon];
        return (
          <Reveal key={area.slug} delay={i * 0.08} className="h-full">
            <article className="card-interactive group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-7">
              <div aria-hidden className="absolute -top-20 -right-20 size-56 rounded-full bg-[radial-gradient(closest-side,var(--glow-brand),transparent)]" />
              <div className="flex items-center justify-between">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                  <Icon aria-hidden className="size-6" />
                </span>
                <span className="rounded-full border px-2.5 py-1 text-xs font-semibold text-muted-foreground">Track {i + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold">
                <Link href={`/ai-areas/${area.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                  {area.title}
                </Link>
              </h3>
              <p className="mt-1 font-medium text-brand-text">{area.tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground">{area.summary}</p>
              {area.incomeStreams && (
                <div className="mt-5 rounded-2xl border border-cta/30 bg-cta/10 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
                    <Coins aria-hidden className="size-3.5 text-cta" /> Ways to earn
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {area.incomeStreams.map((s) => (
                      <li key={s} className="rounded-full bg-background/70 px-2.5 py-1 text-xs">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-brand-text">
                Explore {area.title}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
