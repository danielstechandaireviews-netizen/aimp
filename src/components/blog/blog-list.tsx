"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Category filter over server-rendered post cards. */
export function BlogList({
  posts,
  cards,
  categories,
}: {
  posts: { slug: string; category: string }[];
  cards: Record<string, React.ReactNode>;
  categories: string[];
}) {
  const [category, setCategory] = useState("");
  const shown = posts.filter((p) => !category || p.category === category);

  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {["", ...categories].map((c) => {
          const active = c === category;
          return (
            <button
              key={c || "all"}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                active ? "border-brand bg-brand text-brand-foreground" : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c || "All posts"}
            </button>
          );
        })}
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug}>{cards[p.slug]}</li>
        ))}
      </ul>
    </>
  );
}
