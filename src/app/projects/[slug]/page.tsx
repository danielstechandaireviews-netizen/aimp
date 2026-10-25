import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Factory, Layers, UserCog } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";
import { ProjectCard, ProjectVisual } from "@/components/shared/project-card";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    eyebrow: `${project.kind} · ${project.service}`,
    // Keep placeholder case studies out of search results until replaced.
    noIndex: project.placeholder,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${project.kind} · ${project.service}`}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      >
        {project.placeholder && (
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <PlaceholderBadge /> This is a placeholder project — replace it in src/content/projects.ts.
          </p>
        )}
      </PageHero>

      <article className="container-page grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <aside className="lg:col-span-4">
          <dl className="space-y-5 rounded-3xl border bg-card p-6 lg:sticky lg:top-24">
            {[
              { icon: Building2, label: "Client", value: project.clientType },
              { icon: Factory, label: "Business type", value: project.sector },
              { icon: Layers, label: "Service", value: `${project.service} · ${project.kind}` },
              { icon: UserCog, label: "My role", value: project.role },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <dt className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  <Icon aria-hidden className="size-5 shrink-0 text-brand-text" />
                  {label}
                </dt>
                <dd className="mt-0.5 pl-7">{value}</dd>
              </div>
            ))}
            <div className="border-t pt-5">
              <dt className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Tech stack</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="rounded-full border px-2.5 py-1 text-xs">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>

        <div className="space-y-12 lg:col-span-8">
          <ProjectVisual project={project} className="aspect-[16/9] rounded-3xl border" />

          <section>
            <h2 className="text-2xl font-bold">The challenge</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{project.challenge}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold">The solution</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{project.solution}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold">Results</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.results.map((r) => (
                <div key={r.label + r.metric} className="flex flex-col gap-1 rounded-2xl border bg-card p-6">
                  <dt className="order-2 text-sm text-muted-foreground">{r.label}</dt>
                  <dd className="font-display text-4xl font-bold text-brand-text">{r.metric}</dd>
                </div>
              ))}
            </dl>
          </section>

          {project.images.length > 1 && (
            <section>
              <h2 className="text-2xl font-bold">Visuals</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.images.slice(1).map((img) => (
                  <div key={img.src} className="relative aspect-video overflow-hidden rounded-2xl border">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-text">
            <ArrowLeft aria-hidden className="size-4" /> Back to all projects
          </Link>
        </div>
      </article>

      <section className="section border-t bg-surface">
        <div className="container-page">
          <h2 className="text-2xl font-bold sm:text-3xl">More projects</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Want results like these?"
        primary={{ label: "Request a proposal", href: "/services#enquire" }}
        secondary={{ label: "Book a discovery call", href: "/contact#book" }}
      />
    </>
  );
}
