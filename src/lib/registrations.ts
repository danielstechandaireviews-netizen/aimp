import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { BootcampRoute } from "@/content/bootcamps";
import { env } from "@/lib/email";

/**
 * Cohort registrations, stored in Supabase (see supabase/cohort_registrations.sql). Configure with:
 *   SUPABASE_URL                – your project URL
 *   SUPABASE_SERVICE_ROLE_KEY   – server-only key, never expose it to the browser
 * In development without those, registrations go to .data/registrations.json.
 */

export interface Registration {
  id: string;
  created_at: string;
  cohort: string;
  route: BootcampRoute;
  full_name: string;
  email: string;
  whatsapp: string;
  country: string;
  experience: string;
  goal: string | null;
  source: string | null;
}

export type NewRegistration = Omit<Registration, "id" | "created_at">;
export type SaveResult = { ok: true; duplicate: boolean } | { ok: false; error: string };
export type ListResult = { ok: true; rows: Registration[] } | { ok: false; error: string };

const TABLE = "cohort_registrations";
const PAGE_SIZE = 1000;
const localFile = join(process.cwd(), ".data", "registrations.json");

function supabase() {
  const url = env("SUPABASE_URL")?.replace(/\/$/, "");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;
  return {
    url: `${url}/rest/v1/${TABLE}`,
    headers: {
      apikey: key,
      // Only legacy JWT keys are valid as a bearer token; sb_secret_ keys go in apikey alone.
      ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
      "Content-Type": "application/json",
    },
  };
}

export function storeMode(): "supabase" | "local" | "none" {
  if (supabase()) return "supabase";
  return process.env.NODE_ENV === "production" ? "none" : "local";
}

async function readLocal(): Promise<Registration[]> {
  try {
    return JSON.parse(await readFile(localFile, "utf8"));
  } catch {
    return [];
  }
}

/** Saves a registration. Registering twice for the same route is not an error. */
export async function addRegistration(input: NewRegistration): Promise<SaveResult> {
  const record = { ...input, email: input.email.toLowerCase() };
  const db = supabase();

  if (db) {
    try {
      const res = await fetch(`${db.url}?on_conflict=cohort,route,email`, {
        method: "POST",
        headers: { ...db.headers, Prefer: "resolution=ignore-duplicates,return=representation" },
        body: JSON.stringify(record),
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("[registrations] Supabase insert failed:", res.status, await res.text());
        return { ok: false, error: "Database error" };
      }
      const rows: unknown[] = await res.json();
      return { ok: true, duplicate: rows.length === 0 };
    } catch (err) {
      console.error("[registrations] Supabase insert error:", err);
      return { ok: false, error: "Database error" };
    }
  }

  if (storeMode() === "none") {
    console.error("[registrations] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
    return { ok: false, error: "Database is not configured" };
  }

  const rows = await readLocal();
  if (rows.some((r) => r.cohort === record.cohort && r.route === record.route && r.email === record.email)) {
    return { ok: true, duplicate: true };
  }
  rows.unshift({ ...record, id: randomUUID(), created_at: new Date().toISOString() });
  await mkdir(join(process.cwd(), ".data"), { recursive: true });
  await writeFile(localFile, JSON.stringify(rows, null, 2));
  return { ok: true, duplicate: false };
}

/** Every registration for a cohort, newest first. */
export async function listRegistrations(cohort: string): Promise<ListResult> {
  const db = supabase();

  if (db) {
    try {
      const rows: Registration[] = [];
      for (let offset = 0; ; offset += PAGE_SIZE) {
        const query = new URLSearchParams({
          select: "*",
          cohort: `eq.${cohort}`,
          order: "created_at.desc",
          limit: String(PAGE_SIZE),
          offset: String(offset),
        });
        const res = await fetch(`${db.url}?${query}`, { headers: db.headers, cache: "no-store" });
        if (!res.ok) {
          console.error("[registrations] Supabase read failed:", res.status, await res.text());
          return { ok: false, error: "Could not read the database" };
        }
        const page: Registration[] = await res.json();
        rows.push(...page);
        if (page.length < PAGE_SIZE) return { ok: true, rows };
      }
    } catch (err) {
      console.error("[registrations] Supabase read error:", err);
      return { ok: false, error: "Could not reach the database" };
    }
  }

  if (storeMode() === "none") return { ok: false, error: "Database is not configured" };
  return { ok: true, rows: (await readLocal()).filter((r) => r.cohort === cohort) };
}
