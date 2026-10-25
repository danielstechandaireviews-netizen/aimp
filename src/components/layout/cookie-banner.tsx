"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setConsent, useConsent } from "@/lib/consent";

/**
 * GDPR / UK GDPR / PIPEDA-friendly consent banner.
 * Non-essential cookies (analytics, embedded scheduler) stay off until "Accept".
 * "Reject" is as prominent as "Accept".
 */
export function CookieBanner() {
  const consent = useConsent();

  return (
    <AnimatePresence>
      {consent === "unset" && (
        <m.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border bg-popover/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6"
        >
          <div className="flex gap-4">
            <Cookie aria-hidden className="mt-0.5 hidden size-6 shrink-0 text-brand-text sm:block" />
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We use essential cookies to run this site. With your permission we&apos;d also like to use analytics cookies to
                understand how the site is used, and to load embedded tools such as the booking calendar. See our{" "}
                <Link href="/legal/cookies" className="font-medium text-foreground underline underline-offset-2">
                  Cookie Policy
                </Link>
                .
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="brand" onClick={() => setConsent("accepted")}>
                  Accept all
                </Button>
                <Button variant="outline" onClick={() => setConsent("rejected")}>
                  Reject non-essential
                </Button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/** Lets visitors reopen the banner and change their choice (footer link). */
export function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => setConsent("unset")} className="hover:text-foreground">
      Cookie settings
    </button>
  );
}
