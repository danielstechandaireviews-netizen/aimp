import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { disciplineAreas } from "@/content/areas";
import type { AiArea } from "@/content/types";
import { PillarsGrid } from "@/components/sections/pillars-grid";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { icons } from "@/lib/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Skills That Pay — Software, Automation & Agents",
  description:
    "Three AI hard skills small and medium businesses pay for — AI Software Development, AI Automation and AI Agents — plus the supporting skills that make them work.",
  path: "/ai-areas",
  eyebrow: "AI skills",
});

function AreaCard({ area }: { area: AiArea }) {
  const Icon = icons[area.icon];
  return (
    <article className="card-interactive group relative flex h-full flex-col rounded-3xl border bg-card p-6">
      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand-text">
        <Icon aria-hidden className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-bold">
        <Link href={`/ai-areas/${area.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {area.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{area.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-brand-text">
        Explore <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}

export default function AiAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="AI skills"
        title={
          <>
            Learn the AI skills <span className="text-gradient">businesses pay for</span>
          </>
        }
        description="AIMoniPoint focuses on three hard skills that small and medium businesses are actively paying for — each one a foundation for multiple streams of income."
        breadcrumbs={[{ name: "AI Skills", path: "/ai-areas" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="cta" size="xl">
            <Link href="/#path-quiz">Which skill is right for me?</Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href="/income-streams">See the income streams</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section container-page">
        <SectionHeading
          eyebrow="Three skill tracks"
          title="Where to focus first"
          description="Each track has beginner-to-advanced courses, real portfolio projects and lessons on selling the skill to small businesses."
        />
        <div className="mt-12">
          <PillarsGrid />
        </div>
      </section>

      <section className="section border-y bg-surface">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Supporting skills"
            title="Skills that make your AI work better"
            description="Add these to your toolkit to build more reliable solutions and charge more for them."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {disciplineAreas.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.05} className="h-full">
                <AreaCard area={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not sure which skill to start with?"
        description="Take the 60-second quiz or book a free call for a personalised recommendation based on your background and income goals."
        primary={{ label: "Take the quiz", href: "/#path-quiz" }}
        secondary={{ label: "Book a free call", href: "/contact#book" }}
      />
    </>
  );
}
