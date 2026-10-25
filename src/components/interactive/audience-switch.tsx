"use client";

import { useState } from "react";
import { GraduationCap, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { TabList } from "./tab-list";

/**
 * Two-audience switch: learners vs. small businesses. Both panels are
 * server-rendered (kept in the HTML for SEO); only visibility toggles.
 */
export function AudienceSwitch({ learner, business }: { learner: React.ReactNode; business: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const panels = [learner, business];

  return (
    <div>
      <div className="flex justify-center">
        <TabList
          idBase="audience"
          label="Choose who you are"
          active={active}
          onChange={setActive}
          className="inline-grid grid-cols-2 gap-1 rounded-full border bg-card p-1.5"
          tabClassName={(selected) =>
            cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold duration-300 sm:px-6 sm:text-base",
              selected
                ? "bg-brand text-brand-foreground shadow-[0_8px_24px_-10px_var(--glow-brand)]"
                : "text-muted-foreground hover:text-foreground",
            )
          }
          items={[
            { key: "learn", label: <><GraduationCap aria-hidden className="size-4" /> I want to learn AI</> },
            { key: "business", label: <><Store aria-hidden className="size-4" /> I run a business</> },
          ]}
        />
      </div>
      {panels.map((panel, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`audience-panel-${i}`}
          aria-labelledby={`audience-tab-${i}`}
          hidden={i !== active}
          className="animate-in fade-in mt-10 duration-500"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
