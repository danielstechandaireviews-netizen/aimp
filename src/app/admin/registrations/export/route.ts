import type { NextRequest } from "next/server";
import { bootcamp, currentCohort } from "@/content/bootcamps";
import { isAdmin } from "@/lib/admin-auth";
import { listRegistrations } from "@/lib/registrations";

/** Stops spreadsheet apps running a student-typed value as a formula. Phone numbers are left alone. */
function cell(value: string | null) {
  const text = value ?? "";
  const safe = /^[=+\-@\t\r]/.test(text) && !/^\+?[\d\s()-]+$/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) return new Response("Not authorised", { status: 401 });

  const result = await listRegistrations(currentCohort.id);
  if (!result.ok) return new Response(result.error, { status: 502 });

  const route = bootcamp.courses.find((b) => b.route === request.nextUrl.searchParams.get("route"));
  const rows = route ? result.rows.filter((r) => r.route === route.route) : result.rows;
  const trackOf = (r: string) => bootcamp.courses.find((b) => b.route === r)?.track ?? r;

  const lines = [
    ["Registered", "Name", "Route", "Email", "WhatsApp", "Country", "Experience", "Goal", "Source"].map(cell).join(","),
    ...rows.map((r) => [r.created_at, r.full_name, trackOf(r.route), r.email, r.whatsapp, r.country, r.experience, r.goal, r.source].map(cell).join(",")),
  ];

  // The BOM makes Excel read names with accents correctly.
  return new Response(`﻿${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${currentCohort.id}${route ? `-${route.route}` : ""}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
