"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, RotateCcw } from "lucide-react";
import { calculatorStreams } from "@/content/income";
import type { Currency } from "@/content/types";
import { Button } from "@/components/ui/button";
import { CurrencySwitcher } from "@/components/shared/currency-switcher";
import { formatPrice, useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

type StreamState = { on: boolean; units: number; price: number };
type CalcState = { currency: Currency; streams: Record<string, StreamState> };

const colors = ["bg-brand", "bg-cta", "bg-violet", "bg-sky-400"];

function defaults(currency: Currency): CalcState {
  return {
    currency,
    streams: Object.fromEntries(
      calculatorStreams.map((s) => [s.id, { on: s.defaultUnits > 0, units: s.defaultUnits, price: s.defaultPrice[currency] }]),
    ),
  };
}

/**
 * "Build your income stack" calculator. The visitor sets every number — the
 * starting values are examples only, and the result is not an earnings promise.
 */
export function IncomeCalculator({ compact = false }: { compact?: boolean }) {
  const currency = useCurrency();
  const [saved, setSaved] = useState<CalcState | null>(null);
  // Switching currency resets the example values to that currency's defaults.
  const state = saved && saved.currency === currency ? saved : defaults(currency);

  const update = (id: string, patch: Partial<StreamState>) =>
    setSaved({ currency, streams: { ...state.streams, [id]: { ...state.streams[id], ...patch } } });

  const rows = calculatorStreams.map((s, i) => {
    const st = state.streams[s.id];
    return { ...s, ...st, color: colors[i % colors.length], monthly: st.on ? st.units * st.price : 0 };
  });
  const monthly = rows.reduce((n, r) => n + r.monthly, 0);
  const recurring = rows.filter((r) => r.recurring).reduce((n, r) => n + r.monthly, 0);
  const activeCount = rows.filter((r) => r.on && r.units > 0).length;
  const fmt = (n: number) => formatPrice(n, currency);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Turn streams on and set your own numbers.</p>
          <div className="flex items-center gap-2">
            <CurrencySwitcher compact />
            <button
              type="button"
              onClick={() => setSaved(null)}
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw aria-hidden className="size-3.5" /> Reset
            </button>
          </div>
        </div>

        {rows.map((r) => (
          <fieldset
            key={r.id}
            className={cn("rounded-2xl border bg-card p-5 transition-opacity", !r.on && "opacity-60")}
          >
            <legend className="sr-only">{r.label}</legend>
            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span className="flex items-center gap-3">
                <span aria-hidden className={cn("size-3 rounded-full", r.color)} />
                <span className="font-display text-lg font-bold">{r.label}</span>
                {r.recurring && (
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-semibold text-brand-text">Recurring</span>
                )}
              </span>
              <span className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  role="switch"
                  checked={r.on}
                  onChange={(e) => update(r.id, { on: e.target.checked, units: e.target.checked && r.units === 0 ? 1 : r.units })}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
                />
                <span
                  aria-hidden
                  className="absolute left-0.5 size-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
                />
                <span className="sr-only">Include {r.label}</span>
              </span>
            </label>

            {r.on && (
              <div className={cn("mt-4 grid gap-4", !compact && "sm:grid-cols-2")}>
                <Slider
                  id={`${r.id}-units`}
                  label={r.unitLabel}
                  value={r.units}
                  max={r.maxUnits}
                  display={String(r.units)}
                  onChange={(v) => update(r.id, { units: v })}
                />
                <Slider
                  id={`${r.id}-price`}
                  label={r.priceLabel}
                  value={r.price}
                  max={r.maxPrice[currency]}
                  step={r.maxPrice[currency] > 1000 ? 50 : r.maxPrice[currency] > 200 ? 10 : 1}
                  display={fmt(r.price)}
                  onChange={(v) => update(r.id, { price: v })}
                />
              </div>
            )}
          </fieldset>
        ))}
      </div>

      <div className="lg:col-span-5">
        <div className="gradient-border rounded-3xl bg-card p-6 sm:p-8 lg:sticky lg:top-24">
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Your example income stack</p>
          <p aria-live="polite" className="mt-3">
            <span className="text-gradient font-display text-5xl font-extrabold sm:text-6xl">{fmt(monthly)}</span>
            <span className="ml-2 text-muted-foreground">/ month</span>
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-background/50 p-3">
              <dt className="text-[11px] text-muted-foreground uppercase">Per year</dt>
              <dd className="mt-1 font-display font-bold">{fmt(monthly * 12)}</dd>
            </div>
            <div className="rounded-xl bg-background/50 p-3">
              <dt className="text-[11px] text-muted-foreground uppercase">Recurring</dt>
              <dd className="mt-1 font-display font-bold">{fmt(recurring)}</dd>
            </div>
            <div className="rounded-xl bg-background/50 p-3">
              <dt className="text-[11px] text-muted-foreground uppercase">Streams</dt>
              <dd className="mt-1 font-display font-bold">{activeCount}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <div className="flex h-3 overflow-hidden rounded-full bg-muted" aria-hidden>
              {rows.map((r) =>
                r.monthly > 0 ? (
                  <span key={r.id} className={cn("h-full transition-all duration-500", r.color)} style={{ width: `${(r.monthly / monthly) * 100}%` }} />
                ) : null,
              )}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {rows.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span aria-hidden className={cn("size-2.5 rounded-full", r.color)} /> {r.label}
                  </span>
                  <span className="font-medium tabular-nums">{fmt(r.monthly)}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 flex gap-2 rounded-xl border border-dashed p-3 text-xs text-muted-foreground">
            <Info aria-hidden className="size-4 shrink-0" />
            Illustrative only — you set every number. This is not a promise or estimate of earnings; real results depend on
            your skills, effort, pricing and market.
          </p>

          <Button asChild variant="cta" size="lg" className="mt-6 w-full">
            <Link href="/courses">
              Learn the skills to build this <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Slider({
  id,
  label,
  value,
  max,
  step = 1,
  display,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  max: number;
  step?: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <label htmlFor={id} className="text-muted-foreground">
          {label}
        </label>
        <output htmlFor={id} className="font-display font-bold tabular-nums">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer accent-[var(--brand)]"
      />
    </div>
  );
}
