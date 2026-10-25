"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/content/site";
import type { Currency, Price } from "@/content/types";

export const currencies: { code: Currency; label: string; flag: string }[] = [
  { code: "CAD", label: "Canadian dollar", flag: "🇨🇦" },
  { code: "USD", label: "US dollar", flag: "🇺🇸" },
  { code: "GBP", label: "British pound", flag: "🇬🇧" },
  { code: "EUR", label: "Euro", flag: "🇪🇺" },
];

const STORAGE_KEY = "aimp-currency";
const listeners = new Set<() => void>();

function isCurrency(value: unknown): value is Currency {
  return currencies.some((c) => c.code === value);
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Currency {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isCurrency(stored)) return stored;
  } catch {
    // storage unavailable (private mode etc.) — fall through to default
  }
  return siteConfig.defaultCurrency;
}

function getServerSnapshot(): Currency {
  return siteConfig.defaultCurrency;
}

export function setCurrency(currency: Currency) {
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    // ignore — the choice simply won't persist
  }
  listeners.forEach((l) => l());
}

/** Current display currency, shared across every component on the page. */
export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function formatPrice(amount: number, currency: Currency) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function priceIn(price: Price, currency: Currency) {
  return formatPrice(price[currency], currency);
}
