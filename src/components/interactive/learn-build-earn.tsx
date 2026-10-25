"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Hammer, TrendingUp } from "lucide-react";
import { learnBuildEarn } from "@/content/income";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TabList } from "./tab-list";

const icons = [GraduationCap, Hammer, TrendingUp];
const AUTO_MS = 6000;

/** Learn → Build → Earn stepper. Auto-advances until the visitor interacts. */
export function LearnBuildEarn() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!auto || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % learnBuildEarn.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, auto, paused]);

  const step = learnBuildEarn[active];
  const Icon = icons[active];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
      <TabList
        idBase="lbe"
        label="Learn, build, earn"
        active={active}
        onChange={(i) => {
          setAuto(false);
          setActive(i);
        }}
        className="grid grid-cols-3 gap-2 rounded-2xl border bg-card p-1.5 sm:gap-3"
        tabClassName={(selected) =>
          cn(
            "relative overflow-hidden rounded-xl px-2 py-3 font-display text-base font-bold sm:text-xl",
            selected ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
          )
        }
        items={learnBuildEarn.map((s, i) => ({
          key: s.step,
          label: (
            <>
              <span className="mr-1.5 opacity-60">{i + 1}.</span>
              {s.step}
              {auto && i === active && (
                <span
                  aria-hidden
                  key={`${active}-${paused}`}
                  className="absolute bottom-0 left-0 h-1 bg-brand-foreground/40 motion-reduce:hidden"
                  style={{ animation: paused ? "none" : `progress-fill ${AUTO_MS}ms linear forwards` }}
                />
              )}
            </>
          ),
        }))}
      />

      <div
        role="tabpanel"
        id={`lbe-panel-${active}`}
        aria-labelledby={`lbe-tab-${active}`}
        className="mt-6 grid gap-8 rounded-3xl border bg-card p-6 sm:p-10 md:grid-cols-[auto_1fr] md:items-center"
      >
        <div
          key={active}
          className="animate-in fade-in zoom-in-95 mx-auto flex size-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand to-cta text-brand-foreground shadow-[0_20px_60px_-20px_var(--glow-brand)] duration-500 sm:size-36"
        >
          <Icon aria-hidden className="size-14 sm:size-16" />
        </div>
        <div key={`t-${active}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-sm font-semibold tracking-widest text-brand-text uppercase">
            Step {active + 1} · {step.step}
          </p>
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{step.title}</h3>
          <p className="mt-3 text-muted-foreground sm:text-lg">{step.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {step.points.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5 rounded-full border bg-background/50 px-3 py-1.5 text-sm">
                <Check aria-hidden className="size-3.5 text-brand-text" /> {p}
              </li>
            ))}
          </ul>
          <Button asChild variant="link" className="mt-4 h-auto p-0 text-base">
            <Link href={step.href}>
              {step.cta} <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
