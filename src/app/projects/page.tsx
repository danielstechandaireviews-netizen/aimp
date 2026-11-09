import { projectKinds, projectServices, projects } from "@/content/projects";
import { ProjectFilter } from "@/components/projects/project-filter";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { ProjectCard } from "@/components/shared/project-card";
import { CourseBuilds } from "@/components/shared/course-builds";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects & Student Builds",
  description:
    "The AI chatbots, automations and agents you'll build in AIMoniPoint courses: portfolio projects small and medium businesses pay for.",
  path: "/projects",
  eyebrow: "Projects & student builds",
});

export default function ProjectsPage() {
  const cards = Object.fromEntries(projects.map((p) => [p.slug, <ProjectCard key={p.slug} project={p} />]));

  return (
    <>
      <PageHero
        eyebrow="Projects & student builds"
        title={
          <>
            Real AI tools for <span className="text-gradient">small businesses</span>
          </>
        }
        description="The AI software, automations and agents you'll build as you learn, the same kinds of tools small and medium businesses pay for."
        breadcrumbs={[{ name: "Projects", path: "/projects" }]}
      />

      <section className="section container-page">
        {projects.length > 0 ? (
          <ProjectFilter
            items={projects.map((p) => ({ slug: p.slug, service: p.service, kind: p.kind }))}
            cards={cards}
            services={projectServices}
            kinds={projectKinds}
          />
        ) : (
          <CourseBuilds />
        )}
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
