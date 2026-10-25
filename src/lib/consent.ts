"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie-consent state, stored in localStorage and shared via a tiny store.
 * "unset" means the visitor hasn't chosen yet (banner is shown).
 * Analytics only load when the value is "accepted".
 */
export type Consent = "accepted" | "rejected" | "unset";

const STORAGE_KEY = "aimp-cookie-consent";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Consent {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
    // ignore
  }
  return "unset";
}

/** On the server we don't know yet — render nothing consent-dependent. */
function getServerSnapshot(): Consent | null {
  return null;
}

export function setConsent(value: Exclude<Consent, "unset"> | "unset") {
  try {
    if (value === "unset") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

/** Returns null during SSR / first hydration pass. */
export function useConsent(): Consent | null {
  return useSyncExternalStore<Consent | null>(subscribe, getSnapshot, getServerSnapshot);
}

const noopSubscribe = () => () => {};

/** True once mounted on the client — avoids hydration mismatches. */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
