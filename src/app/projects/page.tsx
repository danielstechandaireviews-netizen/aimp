import { projectKinds, projectServices, projects } from "@/content/projects";
import { ProjectFilter } from "@/components/projects/project-filter";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";
import { ProjectCard } from "@/components/shared/project-card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects & Student Builds",
  description:
    "AI chatbots, automations and agents built for small and medium businesses — by AIMoniPoint and by students applying what they learn.",
  path: "/projects",
  eyebrow: "Projects & student builds",
});

export default function ProjectsPage() {
  const cards = Object.fromEntries(projects.map((p) => [p.slug, <ProjectCard key={p.slug} project={p} />]));
  const anyPlaceholder = projects.some((p) => p.placeholder);

  return (
    <>
      <PageHero
        eyebrow="Projects & student builds"
        title={
          <>
            Real AI tools for <span className="text-gradient">small businesses</span>
          </>
        }
        description="AI software, automations and agents built for small and medium businesses — by AIMoniPoint and by students turning their new skills into paid work."
        breadcrumbs={[{ name: "Projects", path: "/projects" }]}
      >
        {anyPlaceholder && (
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <PlaceholderBadge /> Projects marked as placeholders will be replaced with real projects and student builds.
          </p>
        )}
      </PageHero>

      <section className="section container-page">
        <ProjectFilter
          items={projects.map((p) => ({ slug: p.slug, service: p.service, kind: p.kind }))}
          cards={cards}
          services={projectServices}
          kinds={projectKinds}
        />
      </section>

      <CtaBanner
        title="Build projects like these — or get one built"
        description="Learn the skills to build AI tools for businesses, or tell us what your own business needs."
        primary={{ label: "Explore courses", href: "/courses" }}
        secondary={{ label: "Get a quote for your business", href: "/services#enquire" }}
      />
    </>
  );
}
