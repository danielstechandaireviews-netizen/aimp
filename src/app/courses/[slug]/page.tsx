import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, Coins, FolderGit2, Layers, PlayCircle, Signal, Star, TrendingUp, Users } from "lucide-react";
import { getArea } from "@/content/areas";
import { courses, getCourse, lessonCount } from "@/content/courses";
import { faqGroups } from "@/content/faqs";
import { siteConfig } from "@/content/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EnrolCard } from "@/components/courses/enrol-card";
import { CourseCard } from "@/components/shared/course-card";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { MdxContent } from "@/components/shared/mdx-content";
import { PageHero } from "@/components/shared/page-hero";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { getCourseContent } from "@/lib/mdx";
import { buildMetadata, courseJsonLd, faqJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  const area = getArea(course.area);
  return buildMetadata({
    title: course.title,
    description: course.subtitle,
    path: `/courses/${course.slug}`,
    eyebrow: `${area?.title ?? "Course"} · ${course.level}`,
  });
}

function Block({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="border-t pt-10">
      <h2 id={id ? `${id}-title` : undefined} className="text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-text" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const area = getArea(course.area);
  const mdx = getCourseContent(course.slug);
  const faqs = [...course.faqs, ...faqGroups.find((g) => g.id === "payments")!.items.slice(0, 2)];
  const others = courses.filter((c) => c.slug !== course.slug);
  const related = [...others.filter((c) => c.area === course.area), ...others.filter((c) => c.area !== course.area)].slice(0, 3);
  const lessons = lessonCount(course);

  return (
    <>
      <JsonLd data={courseJsonLd(course)} />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHero
        eyebrow={area?.title}
        title={course.title}
        description={course.subtitle}
        breadcrumbs={[
          { name: "Courses", path: "/courses" },
          { name: course.title, path: `/courses/${course.slug}` },
        ]}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Signal aria-hidden className="size-4 text-brand-text" /> {course.level}
          </li>
          <li className="flex items-center gap-2">
            <Clock aria-hidden className="size-4 text-brand-text" /> {course.duration}
          </li>
          <li className="flex items-center gap-2">
            <Layers aria-hidden className="size-4 text-brand-text" /> {course.curriculum.length} modules · {lessons} lessons
          </li>
          <li className="flex items-center gap-2">
            <Users aria-hidden className="size-4 text-brand-text" /> {course.formats.join(" · ")}
          </li>
          <li className="flex items-center gap-2">
            <Star aria-hidden className="size-4 text-cta" />
            {course.rating ? `${course.rating.value.toFixed(1)} (${course.rating.count} reviews)` : "New course — reviews coming soon"}
          </li>
        </ul>
      </PageHero>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <aside className="lg:order-2 lg:col-span-4">
          <EnrolCard course={course} className="lg:sticky lg:top-24" />
        </aside>

        <div className="space-y-12 lg:order-1 lg:col-span-8">
          <section aria-labelledby="about-title">
            <h2 id="about-title" className="sr-only">
              About this course
            </h2>
            <p className="text-lg leading-relaxed">{course.description}</p>
            {mdx && <MdxContent source={mdx} className="mt-6" />}
          </section>

          <Block title="Who it's for" id="who">
            <CheckList items={course.whoItsFor} />
          </Block>

          <Block title="What you'll learn" id="outcomes">
            <CheckList items={course.outcomes} />
          </Block>

          <section aria-labelledby="earn-title" className="gradient-border rounded-3xl bg-card p-6 sm:p-8">
            <h2 id="earn-title" className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <Coins aria-hidden className="size-6 text-cta" /> Ways to earn with these skills
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {course.earnWith.map((e) => (
                <li key={e} className="flex gap-3 rounded-2xl border border-cta/30 bg-cta/10 p-4">
                  <TrendingUp aria-hidden className="mt-0.5 size-5 shrink-0 text-cta" />
                  <span className="font-medium">{e}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Results depend on your effort, pricing and market — we teach the skills and how to sell them, not guaranteed
              income.{" "}
              <Link href="/income-streams" className="font-medium text-brand-text underline-offset-4 hover:underline">
                Explore income streams
              </Link>
            </p>
          </section>

          <Block title="Prerequisites" id="prerequisites">
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-brand-text">
              {course.prerequisites.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Block>

          <Block title="Curriculum" id="curriculum">
            <p className="mb-4 text-sm text-muted-foreground">
              {course.curriculum.length} modules · {lessons} lessons
            </p>
            <Accordion type="multiple" defaultValue={["module-0"]} className="rounded-2xl border bg-card px-5">
              {course.curriculum.map((m, i) => (
                <AccordionItem key={m.title} value={`module-${i}`}>
                  <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">
                    <span>
                      {m.title}
                      <span className="mt-1 block text-xs font-normal text-muted-foreground">
                        {m.lessons.length} lessons{m.summary ? ` · ${m.summary}` : ""}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="space-y-1">
                      {m.lessons.map((l) => (
                        <li key={l.title} className="flex items-center justify-between gap-4 rounded-lg px-2 py-2 text-sm hover:bg-foreground/5">
                          <span className="flex items-center gap-3">
                            <PlayCircle aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                            {l.title}
                          </span>
                          {l.duration && <span className="shrink-0 text-xs text-muted-foreground">{l.duration}</span>}
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Block>

          <Block title="Projects you'll build" id="projects">
            <div className="grid gap-4 sm:grid-cols-2">
              {course.projects.map((p) => (
                <div key={p.title} className="rounded-2xl border bg-card p-5">
                  <FolderGit2 aria-hidden className="size-5 text-cta" />
                  <h3 className="mt-3 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Tools covered" id="tools">
            <ul className="flex flex-wrap gap-2">
              {course.tools.map((t) => (
                <li key={t} className="rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Your instructor" id="instructor">
            <div className="grid gap-6 rounded-3xl border bg-card p-6 sm:grid-cols-[160px_1fr] sm:p-8">
              <ProfilePhoto className="w-32 sm:w-full" sizes="160px" fade={false} />
              <div>
                <h3 className="text-xl font-bold">{siteConfig.owner.name}</h3>
                <p className="text-sm text-brand-text">{siteConfig.owner.jobTitle}</p>
                <p className="mt-4 text-muted-foreground">
                  Daniel has mastered building AI apps, AI automations and AI agents for small and medium-sized businesses, and
                  has helped over 400 students globally build practical AI skills. He also manages projects as a Senior
                  Business Data Analyst across banking, telecoms and oil &amp; gas — and teaches you how to turn AI skills into
                  income.
                </p>
                <Link href="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-text">
                  Read Daniel&apos;s story <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </Block>

          <Block title="Pricing" id="pricing">
            <EnrolCard course={course} className="max-w-md lg:hidden" />
            <p className="text-muted-foreground max-lg:mt-6">
              Prices are shown in CAD, USD, GBP and EUR — learners elsewhere (e.g. in Africa or Asia) can use USD. Community and
              group pricing is available —{" "}
              <Link href="/contact?topic=courses" className="font-medium text-brand-text underline-offset-4 hover:underline">
                get in touch
              </Link>
              .
            </p>
          </Block>

          <Block title="Frequently asked questions" id="faq">
            <FaqAccordion items={faqs} />
          </Block>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section border-t bg-surface">
          <div className="container-page">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold sm:text-3xl">Related courses</h2>
              <Button asChild variant="link">
                <Link href="/courses">
                  All courses <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
