"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

/**
 * Loads analytics only after the visitor accepts cookies.
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  → Plausible (e.g. "aimonipoint.com")
 *   NEXT_PUBLIC_GA_ID             → Google Analytics 4 (e.g. "G-XXXXXXX")
 * Set one (or neither). Plausible is cookieless, but is still gated here for simplicity.
 */
export function Analytics() {
  const consent = useConsent();
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (consent !== "accepted") return null;

  return (
    <>
      {plausible && (
        <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      )}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
