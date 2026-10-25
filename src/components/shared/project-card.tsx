import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { NeuralPattern } from "./neural-pattern";
import { PlaceholderBadge } from "./placeholder-badge";

/** Generated visual used until a real project image is supplied. */
export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const image = project.images[0];
  if (image) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div aria-hidden className={cn("bg-mesh relative overflow-hidden bg-surface", className)}>
      <div className="bg-grid absolute inset-0" />
      <NeuralPattern className="absolute inset-0 m-auto w-[90%] opacity-70" />
      <span className="absolute bottom-3 left-3 rounded-md bg-background/70 px-2 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
        {project.service} · {project.sector}
      </span>
    </div>
  );
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <article className={cn("card-interactive group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card", className)}>
      <ProjectVisual project={project} className="aspect-[16/9] border-b" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.placeholder && <PlaceholderBadge />}
          <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand-text">{project.service}</span>
          <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">{project.kind}</span>
        </div>
        <h3 className="mt-4 text-lg leading-snug font-semibold">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-brand-text">
          View project
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
