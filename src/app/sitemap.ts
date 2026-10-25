import type { MetadataRoute } from "next";
import { areas } from "@/content/areas";
import { courses } from "@/content/courses";
import { projects } from "@/content/projects";
import { getAllPosts, legalSlugs } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/courses", 0.9, "weekly"),
    page("/ai-areas", 0.8),
    page("/income-streams", 0.9),
    page("/training", 0.8),
    page("/services", 0.8),
    page("/projects", 0.6),
    page("/about", 0.7),
    page("/blog", 0.7, "weekly"),
    page("/free-resources", 0.6),
    page("/faq", 0.5),
    page("/contact", 0.6),
    ...courses.map((c) => page(`/courses/${c.slug}`, 0.9)),
    ...areas.map((a) => page(`/ai-areas/${a.slug}`, a.pillar ? 0.8 : 0.6)),
    // Placeholder case studies are noindex — leave them out until replaced.
    ...projects.filter((p) => !p.placeholder).map((p) => page(`/projects/${p.slug}`, 0.5)),
    ...getAllPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...legalSlugs.map((s) => page(`/legal/${s}`, 0.2, "yearly")),
  ];
}
