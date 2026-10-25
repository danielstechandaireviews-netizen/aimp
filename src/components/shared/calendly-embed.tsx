"use client";

import { useState } from "react";
import { CalendarDays, ExternalLink } from "lucide-react";
import { siteConfig, isPlaceholder } from "@/content/site";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";

/**
 * Inline Calendly scheduler. Calendly sets its own cookies, so the iframe
 * loads automatically only after cookie consent — otherwise on click.
 */
export function CalendlyEmbed({ className }: { className?: string }) {
  const consent = useConsent();
  const [requested, setRequested] = useState(false);
  const url = siteConfig.contact.calendlyUrl;

  if (isPlaceholder(url)) {
    return (
      <div className={cn("flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-card p-8 text-center", className)}>
        <CalendarDays aria-hidden className="size-8 text-brand-text" />
        <p className="font-semibold">Booking calendar placeholder</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Set <code className="rounded bg-muted px-1">NEXT_PUBLIC_CALENDLY_URL</code> to your Calendly link (currently{" "}
          <code className="rounded bg-muted px-1">[CALENDLY_URL]</code>) to show the live scheduler here.
        </p>
      </div>
    );
  }

  const show = requested || consent === "accepted";
  const src = `${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&background_color=0f1424&text_color=e8edf5&primary_color=2ee6d6`;

  if (!show) {
    return (
      <div className={cn("flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-8 text-center", className)}>
        <CalendarDays aria-hidden className="size-8 text-brand-text" />
        <p className="font-semibold">Pick a time that suits you</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          The booking calendar is provided by Calendly, which uses its own cookies.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="cta" onClick={() => setRequested(true)}>
            Load booking calendar
          </Button>
          <Button asChild variant="outline">
            <a href={url} target="_blank" rel="noopener noreferrer">
              Open in Calendly <ExternalLink aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <iframe
      title="Book a discovery call with Daniel Makonor"
      src={src}
      loading="lazy"
      className={cn("h-[700px] w-full rounded-2xl border bg-card", className)}
    />
  );
}
