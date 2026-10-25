import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, CalendarDays, Mic, Presentation, Users } from "lucide-react";
import { bio, careerIndustries, certifications, media, philosophy, skillGroups, timeline, ventures } from "@/content/about";
import { pillarAreas } from "@/content/areas";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { StatsBar } from "@/components/sections/stats-bar";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { NeuralPattern } from "@/components/shared/neural-pattern";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { SectionHeading } from "@/components/shared/section-heading";
import { SocialIcons } from "@/components/shared/social-icons";
import { icons } from "@/lib/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `About ${siteConfig.owner.name} — AI Skill Educator at AIMoniPoint`,
  description: bio.intro,
  path: "/about",
  eyebrow: "About",
});

const mediaIcons = { Podcast: Mic, Talk: Presentation, Workshop: Users } as Record<string, typeof Mic>;

/** Turns venture names in the bio (UtilityApps, ViralMoniPoint) into links. */
function linkVentures(text: string) {
  const pattern = new RegExp(`(${ventures.map((v) => v.name).join("|")})`);
  return text.split(pattern).map((part, i) => {
    const venture = ventures.find((v) => v.name === part);
    return venture ? (
      <a key={i} href={venture.url} target="_blank" rel="noopener" className="font-medium text-brand-text underline underline-offset-4 hover:text-foreground">
        {part}
      </a>
    ) : (
      part
    );
  });
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b">
        <div aria-hidden className="bg-mesh absolute inset-0 -z-10" />
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <NeuralPattern className="absolute -right-24 bottom-0 -z-10 hidden w-[560px] opacity-25 lg:block" />
        <div className="container-page grid items-center gap-12 pt-28 pb-16 md:pt-36 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-brand-text uppercase">AI Skill Educator · AIMoniPoint</p>
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl md:leading-[1.05]">
              Hi, I&apos;m {siteConfig.owner.name.split(" ")[0]}. I help people turn AI skills into{" "}
              <span className="text-gradient">multiple streams of income.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{bio.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="cta" size="xl">
                <Link href="/contact#book">
                  <CalendarDays aria-hidden /> Book a call
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/courses">
                  Explore courses <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
            <SocialIcons showPlaceholders className="mt-8" />
          </div>
          <div className="mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
            <ProfilePhoto priority sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading align="left" eyebrow="My story" title={bio.headline} />
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
          <p className="text-foreground">{bio.intro}</p>
          {bio.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{linkVentures(p)}</p>
          ))}
        </div>
      </section>

      {/* Other products */}
      <section className="container-page pb-16" aria-labelledby="built-title">
        <h2 id="built-title" className="text-xl font-bold">
          Also built by Daniel
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {ventures.map((v) => (
            <li key={v.name}>
              <a
                href={v.url}
                target="_blank"
                rel="noopener"
                className="group flex h-full items-start justify-between gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-brand/50"
              >
                <span>
                  <span className="block font-semibold">{v.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{v.tagline}</span>
                  <span className="mt-2 block text-xs text-brand-text">{v.url.replace("https://", "")}</span>
                </span>
                <ArrowUpRight aria-hidden className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-text" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <StatsBar />

      {/* Timeline */}
      <section className="section container-page" aria-labelledby="journey-title">
        <SectionHeading
          id="journey-title"
          eyebrow="Journey"
          title="From product to engineering, data — and AI education"
          description="The real-world experience behind every course."
        />
        <ol className="relative mx-auto mt-14 max-w-3xl border-l border-brand/40 pl-8">
          {timeline.map((t) => (
            <li key={t.title} className="relative pb-10 last:pb-0">
              <span aria-hidden className="absolute top-1.5 -left-[41px] size-4 rounded-full border-2 border-brand bg-background" />
              <p className="font-mono text-sm text-brand-text">{t.year}</p>
              <h3 className="mt-1 text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-muted-foreground">{t.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Mission */}
      <section className="section border-y bg-surface">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading align="left" eyebrow="The mission" title="AI skills that create more than one income" />
            <p className="mt-6 font-display text-xl font-semibold sm:text-2xl">{siteConfig.mission}</p>
            <p className="mt-4 text-muted-foreground">
              AIMoniPoint serves individuals and small and medium businesses today, entirely online. Students have been taught
              in {siteConfig.regionsServed.join(", ")}, and the community is growing across {siteConfig.regionsGrowing.join(", ")}{" "}
              and beyond.
            </p>
          </div>

          {/* Career background — where Daniel has worked, not AIMoniPoint client work */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border bg-card p-6 sm:p-8">
              <h2 className="text-xl font-bold">Where Daniel works today</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Alongside teaching, Daniel manages projects as a Senior Business Data Analyst in three demanding sectors — the
                source of the reliability and security standards he teaches.
              </p>
              <ul className="mt-6 space-y-4">
                {careerIndustries.map((ind) => {
                  const Icon = icons[ind.icon];
                  return (
                    <li key={ind.name} className="flex gap-4">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-text">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <div>
                        <p className="font-semibold">{ind.name}</p>
                        <p className="text-sm text-muted-foreground">{ind.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section container-page">
        <SectionHeading eyebrow="What I teach" title="Skill tracks & expertise" />
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {pillarAreas.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/ai-areas/${a.slug}`}
                className="inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand/90"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="rounded-2xl border bg-card p-6">
              <h3 className="font-semibold">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s} className="rounded-md border bg-foreground/5 px-2.5 py-1 text-xs font-medium">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="section border-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Teaching philosophy"
            title={
              <>
                Practical. Project-based. <span className="text-gradient">Income-focused.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {philosophy.map((p, i) => (
              <div key={p.title} className="rounded-2xl border bg-card p-7">
                <span aria-hidden className="font-display text-5xl font-bold text-brand-text">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications + media */}
      <section className="section container-page grid gap-12 lg:grid-cols-2">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold sm:text-3xl">Certifications</h2>
            <PlaceholderBadge />
          </div>
          <ul className="mt-6 space-y-3">
            {certifications.map((c, i) => (
              <li key={i} className="flex items-center gap-4 rounded-xl border border-dashed bg-card p-4">
                <Award aria-hidden className="size-6 shrink-0 text-cta" />
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {c.issuer} · {c.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold sm:text-3xl">Media, speaking &amp; podcast</h2>
            <PlaceholderBadge />
          </div>
          <ul className="mt-6 space-y-3">
            {media.map((m, i) => {
              const Icon = mediaIcons[m.type] ?? Mic;
              const body = (
                <>
                  <Icon aria-hidden className="size-6 shrink-0 text-brand-text" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{m.type}</p>
                    <p className="font-semibold">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{m.outlet}</p>
                  </div>
                </>
              );
              return (
                <li key={i}>
                  {m.url ? (
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border bg-card p-4 hover:border-brand/50">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border border-dashed bg-card p-4">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Interested in having Daniel speak at your event or on your podcast?{" "}
            <Link href="/contact?topic=speaking" className="font-medium text-brand-text underline-offset-4 hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBanner
        title="Let's map your AI income path"
        description="Whether you want to learn AI skills, build income streams or get AI built for your business — a free discovery call is the best place to start."
      />
    </>
  );
}
