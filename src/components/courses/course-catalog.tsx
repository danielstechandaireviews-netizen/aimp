"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { CourseFormat, Level } from "@/content/types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface CatalogItem {
  slug: string;
  title: string;
  searchText: string;
  area: string;
  level: Level;
  formats: CourseFormat[];
}

interface Props {
  items: CatalogItem[];
  /** Server-rendered course cards, keyed by slug. */
  cards: Record<string, React.ReactNode>;
  areaOptions: { value: string; label: string }[];
}

const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];
const formats: CourseFormat[] = ["Self-paced", "Live cohort", "1-on-1"];

export function CourseCatalog({ items, cards, areaOptions }: Props) {
  const params = useSearchParams();
  const [resetKey, setResetKey] = useState(0);
  const area = params.get("area") ?? "";
  const level = params.get("level") ?? "";
  const format = params.get("format") ?? "";
  const q = params.get("q") ?? "";

  /** Updates the query string without a server round-trip. */
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter(
      (c) =>
        (!area || c.area === area) &&
        (!level || c.level === level) &&
        (!format || c.formats.includes(format as CourseFormat)) &&
        (!query || c.searchText.includes(query)),
    );
  }, [items, area, level, format, q]);

  const hasFilters = Boolean(area || level || format || q);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <aside className="lg:col-span-3" aria-label="Course filters">
        <div className="space-y-8 lg:sticky lg:top-24">
          <div>
            <label htmlFor="course-search" className="text-sm font-semibold">
              Search
            </label>
            <div className="relative mt-2">
              <Search aria-hidden className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                key={resetKey}
                id="course-search"
                type="search"
                placeholder="e.g. RAG, n8n, agents"
                defaultValue={q}
                onChange={(e) => setParam("q", e.target.value)}
                className="h-11 bg-card pl-9"
              />
            </div>
          </div>
          <FilterGroup
            legend="Skill track"
            name="area"
            value={area}
            options={areaOptions}
            onChange={(v) => setParam("area", v)}
          />
          <FilterGroup
            legend="Level"
            name="level"
            value={level}
            options={levels.map((l) => ({ value: l, label: l }))}
            onChange={(v) => setParam("level", v)}
          />
          <FilterGroup
            legend="Format"
            name="format"
            value={format}
            options={formats.map((f) => ({ value: f, label: f }))}
            onChange={(v) => setParam("format", v)}
          />
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                window.history.replaceState(null, "", window.location.pathname);
                setResetKey((k) => k + 1);
              }}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-text"
            >
              <X aria-hidden className="size-4" /> Clear all filters
            </button>
          )}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <p aria-live="polite" className="mb-6 text-sm text-muted-foreground">
          Showing <strong className="text-foreground">{results.length}</strong> of {items.length} courses
        </p>
        {results.length ? (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((c) => (
              <li key={c.slug}>{cards[c.slug]}</li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <p className="font-semibold">No courses match those filters.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try removing a filter, or get in touch to request a topic.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const all = [{ value: "", label: "All" }, ...options];
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {all.map((o) => {
          const id = `${name}-${o.value || "all"}`;
          const checked = value === o.value;
          return (
            <div key={id}>
              <input
                type="radio"
                id={id}
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  "inline-flex cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                  checked ? "border-brand bg-brand text-brand-foreground" : "bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {o.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
