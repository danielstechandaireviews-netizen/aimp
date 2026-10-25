import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Coins, Lightbulb } from "lucide-react";
import { areas, getArea } from "@/content/areas";
import { getCourse } from "@/content/courses";
import { getService } from "@/content/services";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/shared/course-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { icons } from "@/lib/icons";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ai-areas/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.title,
    description: area.summary,
    path: `/ai-areas/${area.slug}`,
    eyebrow: area.pillar ? "AI skill track" : "Supporting AI skill",
  });
}

export default async function AreaPage({ params }: PageProps<"/ai-areas/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const Icon = icons[area.icon];
  const relatedCourses = area.relatedCourses.map(getCourse).filter((c) => c !== undefined);
  const relatedServices = area.relatedServices.map(getService).filter((s) => s !== undefined);
  const others = areas.filter((a) => a.slug !== area.slug && a.kind === area.kind).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={area.pillar ? "AI skill track" : "Supporting skill"}
        title={area.title}
        description={area.tagline}
        breadcrumbs={[
          { name: "AI Skills", path: "/ai-areas" },
          { name: area.title, path: `/ai-areas/${area.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {relatedCourses[0] && (
            <Button asChild variant="cta" size="lg">
              <Link href={`/courses?area=${area.slug}`}>Related courses</Link>
            </Button>
          )}
          <Button asChild variant="glass" size="lg">
            <Link href="/contact#book">Book a discovery call</Link>
          </Button>
        </div>
      </PageHero>

      {/* Overview + outcomes */}
      <section className="section container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
              <Icon aria-hidden className="size-6" />
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">Overview</h2>
          </div>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {area.overview.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-3xl border bg-card p-7 lg:col-span-5">
          <h2 className="text-xl font-bold">What you&apos;ll be able to do</h2>
          <ul className="mt-5 space-y-3">
            {area.outcomes.map((o) => (
              <li key={o} className="flex gap-3">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-text" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Tools */}
      <section className="border-y bg-surface py-14">
        <div className="container-page">
          <h2 className="text-xl font-bold">Tools &amp; technologies</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {area.tools.map((t) => (
              <li key={t} className="rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {area.incomeStreams && (
        <section className="section container-page pb-0">
          <div className="gradient-border rounded-3xl bg-card p-7 sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                  <Coins aria-hidden className="size-4 text-cta" /> Ways to earn with {area.shortTitle ?? area.title}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {area.incomeStreams.map((s) => (
                    <li key={s} className="rounded-full border border-cta/40 bg-cta/10 px-3.5 py-1.5 text-sm font-medium">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild variant="cta" size="lg" className="shrink-0">
                <Link href="/income-streams#calculator">Build your income stack</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Use cases */}
      <section className="section container-page">
        <SectionHeading align="left" eyebrow="What you can build & sell" title={`What businesses use ${area.shortTitle ?? area.title} for`} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {area.useCases.map((u) => (
            <div key={u.title} className="rounded-2xl border bg-card p-6">
              <Lightbulb aria-hidden className="size-6 text-cta" />
              <h3 className="mt-4 text-lg font-semibold">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{u.description}</p>
            </div>
          ))}
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="section border-t container-page">
          <SectionHeading align="left" eyebrow="Learn it" title="Related courses" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="section border-t container-page">
          <SectionHeading align="left" eyebrow="Run a business?" title="Have it built for you" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="container-page pb-4">
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Explore other areas</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/ai-areas/${o.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-brand/50"
                >
                  {o.title} <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBanner
        title={`Ready to start earning with ${area.shortTitle ?? area.title}?`}
        description="Book a free discovery call — we'll map the fastest path from where you are now to your first paying client."
        secondary={{ label: "View courses", href: "/courses" }}
      />
    </>
  );
}
