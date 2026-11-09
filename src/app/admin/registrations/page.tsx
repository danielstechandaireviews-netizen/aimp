import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Download } from "lucide-react";
import { bootcamp, currentCohort, registrationPath } from "@/content/bootcamps";
import { AdminLoginForm } from "@/components/forms/admin-login-form";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/lib/admin-actions";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { listRegistrations, storeMode } from "@/lib/registrations";
import { absoluteUrl, cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Registrations",
  robots: { index: false, follow: false },
};

const when = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" });

export default async function RegistrationsPage({ searchParams }: PageProps<"/admin/registrations">) {
  if (!(await isAdmin())) {
    return (
      <section className="container-page max-w-md pt-32 pb-20">
        <h1 className="text-3xl font-bold">Student registrations</h1>
        {isAdminConfigured() ? (
          <div className="mt-8">
            <AdminLoginForm />
          </div>
        ) : (
          <p className="mt-4 text-muted-foreground">
            This page is locked until <code className="rounded bg-muted px-1">ADMIN_PASSWORD</code> is set in the hosting environment.
          </p>
        )}
      </section>
    );
  }

  const { route } = await searchParams;
  const selected = bootcamp.courses.find((b) => b.route === route);
  const result = await listRegistrations(currentCohort.id);
  const all = result.ok ? result.rows : [];
  const rows = selected ? all.filter((r) => r.route === selected.route) : all;
  const countFor = (r: string) => all.filter((x) => x.route === r).length;

  const sources = Object.entries(
    all.reduce<Record<string, number>>((acc, r) => {
      const key = r.source || "direct";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const pill = (active: boolean) =>
    cn("rounded-full border px-4 py-1.5 text-sm font-medium", active ? "border-brand bg-brand text-brand-foreground" : "bg-card hover:border-brand/50");

  return (
    <section className="container-page pt-28 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-text uppercase">{currentCohort.title}</p>
          <h1 className="mt-1 text-3xl font-bold">Student registrations</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <a href={`/admin/registrations/export${selected ? `?route=${selected.route}` : ""}`}>
              <Download aria-hidden /> Download CSV
            </a>
          </Button>
          <form action={adminLogout}>
            <Button type="submit" variant="ghost">
              Log out
            </Button>
          </form>
        </div>
      </div>

      {(!result.ok || storeMode() === "local") && (
        <p className="mt-6 flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-destructive" />
          {result.ok
            ? "Development mode: registrations are saved to .data/registrations.json on this computer."
            : `${result.error}. New registrations still reach your inbox by email, but can't be listed here until the database is connected.`}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">All routes</p>
          <p className="mt-1 font-display text-4xl font-bold">{all.length}</p>
        </div>
        {bootcamp.courses.map((b) => (
          <div key={b.route} className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{b.track}</p>
            <p className="mt-1 font-display text-4xl font-bold">{countFor(b.route)}</p>
            <a href={registrationPath(b.route)} className="mt-2 block truncate text-xs text-brand-text hover:underline">
              {absoluteUrl(registrationPath(b.route)).replace(/^https?:\/\//, "")}
            </a>
          </div>
        ))}
      </div>

      {sources.length > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Where they came from:</span> {sources.map(([s, n]) => `${s} (${n})`).join(" · ")}
        </p>
      )}

      <nav aria-label="Filter by route" className="mt-8 flex flex-wrap gap-2">
        <Link href="/admin/registrations" className={pill(!selected)}>
          All ({all.length})
        </Link>
        {bootcamp.courses.map((b) => (
          <Link key={b.route} href={`/admin/registrations?route=${b.route}`} className={pill(selected?.route === b.route)}>
            {b.track} ({countFor(b.route)})
          </Link>
        ))}
      </nav>

      <div className="mt-6 overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              {["Registered", "Name", "Route", "Email", "WhatsApp", "Country", "Experience", "Goal", "Source"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b align-top last:border-0">
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{when.format(new Date(r.created_at))}</td>
                <td className="px-4 py-3 font-medium">{r.full_name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{bootcamp.courses.find((b) => b.route === r.route)?.track ?? r.route}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${r.email}`} className="text-brand-text hover:underline">
                    {r.email}
                  </a>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <a href={`https://wa.me/${r.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-brand-text hover:underline">
                    {r.whatsapp}
                  </a>
                </td>
                <td className="px-4 py-3">{r.country}</td>
                <td className="px-4 py-3">{r.experience}</td>
                <td className="max-w-xs px-4 py-3 text-muted-foreground">{r.goal}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.source}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-muted-foreground">
                  No registrations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
