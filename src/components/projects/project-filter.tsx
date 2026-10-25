"use client";

import { useState } from "react";
import type { ProjectKind, ProjectService } from "@/content/types";
import { cn } from "@/lib/utils";

interface Props {
  items: { slug: string; service: ProjectService; kind: ProjectKind }[];
  cards: Record<string, React.ReactNode>;
  services: readonly ProjectService[];
  kinds: readonly ProjectKind[];
}

export function ProjectFilter({ items, cards, services, kinds }: Props) {
  const [service, setService] = useState<string>("");
  const [kind, setKind] = useState<string>("");

  const results = items.filter((p) => (!service || p.service === service) && (!kind || p.kind === kind));

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
          <Chips label="Service" value={service} options={services} onChange={setService} />
          <Chips label="Type" value={kind} options={kinds} onChange={setKind} />
        </div>
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {results.length} of {items.length} projects
        </p>
      </div>
      {results.length ? (
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug}>{cards[p.slug]}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          No projects match those filters yet.
        </p>
      )}
    </>
  );
}

function Chips({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
      <p className="text-sm font-semibold">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["", ...options].map((o) => {
          const active = value === o;
          return (
            <button
              key={o || "all"}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                active ? "border-brand bg-brand text-brand-foreground" : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {o || "All"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
