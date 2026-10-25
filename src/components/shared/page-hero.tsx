import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./breadcrumbs";
import { NeuralPattern } from "./neural-pattern";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
  className?: string;
}

/** Standard hero used at the top of inner pages. */
export function PageHero({ eyebrow, title, description, breadcrumbs, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden border-b", className)}>
      <div aria-hidden className="bg-mesh absolute inset-0 -z-10" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <NeuralPattern className="absolute -right-24 -bottom-10 -z-10 hidden w-[560px] opacity-40 lg:block" />
      <div className="container-page pt-28 pb-14 md:pt-36 md:pb-20">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-brand-text uppercase">{eyebrow}</p>
        )}
        <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl md:text-6xl md:leading-[1.05]">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
