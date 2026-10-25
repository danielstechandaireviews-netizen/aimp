import Link from "next/link";
import { getArea } from "@/content/areas";
import { incomeStreams } from "@/content/income";
import { Button } from "@/components/ui/button";
import { IncomeCalculator } from "@/components/interactive/income-calculator";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { icons } from "@/lib/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Multiple Streams of Income with AI Skills",
  description:
    "Turn AI skills into multiple income streams: freelance AI projects, monthly retainers, your own AI agency, templates, micro-SaaS and AI roles. Build your own income stack with the interactive calculator.",
  path: "/income-streams",
  eyebrow: "Income streams",
});

const stages = [
  { title: "Start", text: "Learn one skill and land your first freelance project.", streams: ["Freelance AI projects"] },
  { title: "Stabilise", text: "Turn happy clients into monthly retainers for steady, recurring income.", streams: ["Monthly retainers"] },
  { title: "Scale", text: "Package what works into templates, products or a small agency.", streams: ["Templates", "Agency", "Micro-SaaS"] },
];

export default function IncomeStreamsPage() {
  return (
    <>
      <PageHero
        eyebrow="Multiple streams of income"
        title={
          <>
            One set of AI skills. <span className="text-gradient">Many ways to earn.</span>
          </>
        }
        description="The goal isn't just to learn AI — it's to build income that doesn't depend on a single client or a single job. Here's how AI hard skills turn into multiple streams of income."
        breadcrumbs={[{ name: "Income streams", path: "/income-streams" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="cta" size="xl">
            <Link href="#calculator">Build your income stack</Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href="/#path-quiz">Find my path (quiz)</Link>
          </Button>
        </div>
      </PageHero>

      {/* Streams */}
      <section className="section container-page">
        <SectionHeading eyebrow="Six income streams" title="Where your AI skills can pay you" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {incomeStreams.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.id} delay={i * 0.05} className="h-full">
                <article className="card-interactive flex h-full flex-col rounded-3xl border bg-card p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-cta text-cta-foreground">
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <span className="rounded-full border px-2.5 py-1 text-xs font-semibold text-muted-foreground">{s.model}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold">{s.title}</h2>
                  <p className="mt-2 text-muted-foreground">{s.description}</p>
                  <p className="mt-5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Examples</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {s.examples.map((e) => (
                      <li key={e} className="rounded-full bg-brand/10 px-2.5 py-1 text-xs text-brand-text">
                        {e}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Powered by</p>
                  <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                    {s.skills.map((slug) => {
                      const area = getArea(slug);
                      return area ? (
                        <li key={slug}>
                          <Link href={`/ai-areas/${slug}`} className="font-medium text-brand-text underline-offset-4 hover:underline">
                            {area.title}
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Stacking */}
      <section className="section border-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Stack your streams"
            title="Start with one. Add more over time."
            description="Most people don't launch six streams at once. They start with one skill and one stream, then layer on recurring and scalable income."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {stages.map((st, i) => (
              <li key={st.title} className="relative rounded-3xl border bg-card p-7">
                <span className="font-display text-6xl font-extrabold text-brand-text" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-2xl font-bold">{st.title}</h3>
                <p className="mt-2 text-muted-foreground">{st.text}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {st.streams.map((s) => (
                    <li key={s} className="rounded-full border border-cta/40 bg-cta/10 px-2.5 py-1 text-xs font-medium">
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="section container-page">
        <SectionHeading
          eyebrow="Interactive calculator"
          title="Build your income stack"
          description="Switch streams on, drag the sliders and see how project, recurring and product income add up. You choose every number."
        />
        <div className="mt-12">
          <IncomeCalculator />
        </div>
      </section>

      <CtaBanner
        title="Ready to build your first income stream?"
        description="Book a free discovery call and we'll map the fastest path from your current skills to your first paying client."
        secondary={{ label: "Explore courses", href: "/courses" }}
      />
    </>
  );
}
