"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Coins, Store } from "lucide-react";
import type { IconName } from "@/content/types";
import { Button } from "@/components/ui/button";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { TabList } from "./tab-list";

export interface TrackData {
  slug: string;
  title: string;
  icon: IconName;
  tagline: string;
  summary: string;
  learn: string[];
  sell: string[];
  earn: string[];
  course?: { slug: string; title: string; level: string };
  beginnerFriendly: boolean;
}

/** Interactive tabs for the three money-making skill tracks. */
export function SkillTracks({ tracks }: { tracks: TrackData[] }) {
  const [active, setActive] = useState(0);
  const t = tracks[active];

  return (
    <div>
      <TabList
        idBase="tracks"
        label="AI skill tracks"
        active={active}
        onChange={setActive}
        className="grid gap-3 sm:grid-cols-3"
        tabClassName={(selected) =>
          cn(
            "flex items-center gap-3 rounded-2xl border p-4 text-left",
            selected ? "gradient-border border-transparent bg-card shadow-[0_20px_50px_-25px_var(--glow-brand)]" : "bg-card/50 hover:bg-card",
          )
        }
        items={tracks.map((tr) => {
          const Icon = icons[tr.icon];
          return {
            key: tr.slug,
            label: (
              <>
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-text">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold">{tr.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {tr.beginnerFriendly ? "No coding needed" : "For coders"}
                  </span>
                </span>
              </>
            ),
          };
        })}
      />

      <div
        role="tabpanel"
        id={`tracks-panel-${active}`}
        aria-labelledby={`tracks-tab-${active}`}
        key={t.slug}
        className="animate-in fade-in slide-in-from-bottom-2 mt-6 rounded-3xl border bg-card p-6 duration-500 sm:p-8"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-2xl font-bold sm:text-3xl">{t.tagline}</h3>
            <p className="mt-2 max-w-2xl text-muted-foreground">{t.summary}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Column title="What you'll learn" icon={<Check aria-hidden className="size-4" />} items={t.learn} />
          <Column title="What you can sell to businesses" icon={<Store aria-hidden className="size-4" />} items={t.sell} />
          <Column
            title="Income streams it unlocks"
            icon={<Coins aria-hidden className="size-4" />}
            items={t.earn}
            highlight
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          {t.course && (
            <p className="text-sm text-muted-foreground">
              Start with <strong className="text-foreground">{t.course.title}</strong> · {t.course.level}
            </p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            {t.course && (
              <Button asChild variant="cta">
                <Link href={`/courses/${t.course.slug}`}>
                  View course <ArrowRight aria-hidden />
                </Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link href={`/ai-areas/${t.slug}`}>Explore {t.title}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column({ title, icon, items, highlight }: { title: string; icon: React.ReactNode; items: string[]; highlight?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-5", highlight ? "border-cta/40 bg-cta/10" : "bg-background/40")}>
      <h4 className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
        <span className={cn("inline-flex size-7 items-center justify-center rounded-lg", highlight ? "bg-cta text-cta-foreground" : "bg-brand/15 text-brand-text")}>
          {icon}
        </span>
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", highlight ? "bg-cta" : "bg-brand")} />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
