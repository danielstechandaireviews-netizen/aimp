import Link from "next/link";
import { ArrowRight, CalendarDays, Calculator, Check, Download, MessagesSquare, User, Users } from "lucide-react";
import { bio } from "@/content/about";
import { pillarAreas } from "@/content/areas";
import { courses, featuredCourses, getCourse } from "@/content/courses";
import { homeFaqs } from "@/content/faqs";
import { incomeStreams } from "@/content/income";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { CourseCarousel } from "@/components/home/course-carousel";
import { Hero } from "@/components/home/hero";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { AudienceSwitch } from "@/components/interactive/audience-switch";
import { LearnBuildEarn } from "@/components/interactive/learn-build-earn";
import { Marquee } from "@/components/interactive/marquee";
import { PathQuiz } from "@/components/interactive/path-quiz";
import { SkillTracks, type TrackData } from "@/components/interactive/skill-tracks";
import { BootcampSection } from "@/components/sections/bootcamp-section";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { StatsBar } from "@/components/sections/stats-bar";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CourseCard } from "@/components/shared/course-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { CurrencySwitcher } from "@/components/shared/currency-switcher";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Price } from "@/components/shared/price";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { ProjectCard } from "@/components/shared/project-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { icons } from "@/lib/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Learn AI Skills. Build Multiple Streams of Income.`,
  description: siteConfig.description,
  path: "/",
  eyebrow: "Learn AI · Build with AI · Earn with AI",
  titleTemplate: false,
});

const tools = [
  "OpenAI",
  "Claude",
  "n8n",
  "Make",
  "Zapier",
  "LangGraph",
  "MCP",
  "Python",
  "Next.js",
  "Supabase",
  "WhatsApp API",
  "Gemini",
  "Pinecone",
  "CrewAI",
  "HubSpot",
  "Vercel",
];

export default function HomePage() {
  const tracks: TrackData[] = pillarAreas.map((a) => {
    const course = getCourse(a.relatedCourses[0]);
    return {
      slug: a.slug,
      title: a.title,
      icon: a.icon,
      tagline: a.tagline,
      summary: a.summary,
      learn: a.outcomes.slice(0, 4),
      sell: a.useCases.map((u) => u.title),
      earn: a.incomeStreams ?? [],
      course: course && { slug: course.slug, title: course.title, level: course.level },
      beginnerFriendly: a.slug === "ai-automation",
    };
  });

  return (
    <>
      <Hero />
      <StatsBar className="relative z-10 -mt-4 md:-mt-8" />

      {/* Tools marquee */}
      <section aria-label="Tools you'll master" className="py-14">
        <p className="mb-6 text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Tools you&apos;ll master
        </p>
        <Marquee
          items={tools.map((t) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 font-display text-sm font-semibold">
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              {t}
            </span>
          ))}
        />
      </section>

      {/* Learn → Build → Earn */}
      <section className="section container-page pt-6">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Learn it. Build it. <span className="text-gradient">Earn from it.</span>
            </>
          }
          description="A simple path from your first AI lesson to your first paying client — and then to more than one income stream."
        />
        <div className="mx-auto mt-12 max-w-5xl">
          <LearnBuildEarn />
        </div>
      </section>

      {/* Skill tracks */}
      <section className="section border-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Three skill tracks"
            title="Pick the AI skill that pays"
            description="Every track teaches a hard skill small and medium businesses are actively paying for — and shows you how to sell it."
          />
          <div className="mt-12">
            <SkillTracks tracks={tracks} />
          </div>
        </div>
      </section>

      {/* Path quiz */}
      <section id="path-quiz" className="section container-page">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="60-second quiz"
            title="Find your AI income path"
            description="Answer three quick questions and get a personalised starting point: the right skill, course and format for you."
          />
          <div className="mt-10">
            <PathQuiz />
          </div>
        </div>
      </section>

      {/* Income streams */}
      <section className="section relative isolate overflow-hidden border-y bg-surface">
        <div aria-hidden className="bg-mesh absolute inset-0 -z-10 opacity-60" />
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Multiple streams of income"
              title="One skill set. Many ways to earn."
              description="AI skills don't have to mean one job or one client. Stack project income, recurring retainers and scalable products."
            />
            <Button asChild variant="cta" size="lg" className="shrink-0">
              <Link href="/income-streams#calculator">
                <Calculator aria-hidden /> Try the income calculator
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {incomeStreams.map((s, i) => {
              const Icon = icons[s.icon];
              return (
                <Reveal key={s.id} delay={i * 0.05} className="h-full">
                  <article className="card-interactive flex h-full flex-col rounded-3xl border bg-card p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-cta text-cta-foreground">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="rounded-full border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                        {s.model}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {s.examples.map((e) => (
                        <li key={e} className="rounded-full bg-brand/10 px-2.5 py-1 text-xs text-brand-text">
                          {e}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="section container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Featured courses"
            title="Courses that get you earning"
            description={`${courses.length} hands-on courses with real projects and lessons on selling your skills. Prices in your currency.`}
          />
          <CurrencySwitcher className="self-start md:self-end" />
        </div>
        <div className="mt-8">
          <CourseCarousel label="Featured courses">
            {featuredCourses.map((c) => (
              <li key={c.slug} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <CourseCard course={c} />
              </li>
            ))}
          </CourseCarousel>
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/courses">
              View all courses <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <BootcampSection className="pt-0" />

      {/* Two audiences */}
      <section className="section border-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Two ways to work with AIMoniPoint"
            title="Learn the skills — or have them built for you"
            description="The same AI services we teach are the ones we deliver for small and medium businesses."
          />
          <div className="mt-10">
            <AudienceSwitch
              learner={
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    { icon: Check, title: "Self-paced courses", text: "Video courses in all three skill tracks, $100 each.", href: "/courses", cta: "Browse courses" },
                    { icon: CalendarDays, title: "Quarterly bootcamps", text: "1-month live bootcamps for $200, every March, June, September and December.", href: "/courses#bootcamps", cta: "See bootcamp dates" },
                    { icon: User, title: "1-on-1 mentorship", text: "Work directly with Daniel, from learning AI to earning with it. $350.", href: "/training#mentorship", cta: "See mentorship" },
                    { icon: Users, title: "Community cohorts", text: "Live online training for communities and groups, worldwide.", href: "/training#community", cta: "Bring a cohort" },
                  ].map((c) => (
                    <div key={c.title} className="flex flex-col rounded-3xl border bg-card p-6">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand/15 text-brand-text">
                        <c.icon aria-hidden className="size-5" />
                      </span>
                      <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                      <div className="mt-auto pt-6">
                        <Button asChild variant="outline" className="w-full">
                          <Link href={c.href}>
                            {c.cta} <ArrowRight aria-hidden />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              }
              business={
                <div className="grid gap-5 md:grid-cols-3">
                  {services.map((s) => {
                    const Icon = icons[s.icon];
                    return (
                      <div key={s.slug} className="flex flex-col rounded-3xl border bg-card p-6">
                        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                          <Icon aria-hidden className="size-5" />
                        </span>
                        <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
                        <p className="mt-4 text-sm">
                          {s.startingAt ? (
                            <>
                              <span className="text-muted-foreground">From </span>
                              <Price price={s.startingAt} className="text-lg" />
                            </>
                          ) : (
                            <span className="font-semibold">Custom quote</span>
                          )}
                          <span className="text-muted-foreground"> · {s.timeline.toLowerCase()}</span>
                        </p>
                        <div className="mt-auto pt-6">
                          <Button asChild variant="cta" className="w-full">
                            <Link href={`/services#${s.slug}`}>
                              Get a quote <ArrowRight aria-hidden />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="section overflow-x-clip">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <ProfilePhoto sizes="(min-width: 1024px) 40vw, 90vw" />
        </div>
        <div className="lg:col-span-7">
          <SectionHeading align="left" eyebrow="Meet your AI Skill Educator" title={bio.headline} />
          <p className="mt-6 text-lg">{bio.intro}</p>
          <p className="mt-4 text-muted-foreground">{bio.paragraphs[0]}</p>
          <div className="mt-6 rounded-2xl border bg-card p-5">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">AIMoniPoint&apos;s mission</p>
            <p className="mt-2 font-display text-lg font-semibold">{siteConfig.mission}</p>
          </div>
          <Button asChild variant="brand" size="lg" className="mt-8">
            <Link href="/about">
              Read my story <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        </div>
      </section>

      {/* Projects & student builds */}
      <section className="section border-y bg-surface">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Projects & student builds"
              title="Real AI tools for real small businesses"
              description="The kind of projects you'll build — and sell — as you learn."
            />
            <Link href="/projects" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-text">
              All projects <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection title="What students and clients say" />
      <PartnersStrip />

      {/* FAQ */}
      <section className="section container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions, answered"
              description="Can't find what you're looking for? Get in touch — happy to help."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="lg">
                <Link href="/faq">See all FAQs</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">
                  <MessagesSquare aria-hidden /> Ask a question
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaBanner />

      {/* Lead magnet + newsletter */}
      <section className="container-page pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="gradient-border flex flex-col justify-between rounded-3xl bg-card p-8 md:p-10">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brand-text uppercase">Free download</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{siteConfig.leadMagnet.title}</h2>
              <p className="mt-3 text-muted-foreground">{siteConfig.leadMagnet.description}</p>
            </div>
            <Button asChild variant="cta" size="lg" className="mt-6 self-start">
              <Link href="/free-resources">
                <Download aria-hidden /> Get the free roadmap
              </Link>
            </Button>
          </div>
          <div className="rounded-3xl border bg-card p-8 md:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">AI income ideas, every two weeks</h2>
            <p className="mt-3 mb-6 text-muted-foreground">
              Practical tutorials, automation ideas, new income streams and early access to cohorts — straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
