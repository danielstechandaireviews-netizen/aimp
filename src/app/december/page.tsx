import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Globe2, Users } from "lucide-react";
import { bootcamp, currentCohort, registrationPath } from "@/content/bootcamps";
import { getCourse } from "@/content/courses";
import { whatsappUrl } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { trainingOfferings } from "@/content/training";
import { Countdown } from "@/components/december/countdown";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { sourceFrom } from "./source";

const price = `$${bootcamp.price.USD} USD`;

export const metadata = buildMetadata({
  title: `${currentCohort.title}: 1-month live AI bootcamp`,
  description: `Step into 2027 with a new income stream. A live, 1-month AI bootcamp, ${currentCohort.dates}. ${price} for any skill route: AI App Development, AI Automation or Agentic AI.`,
  path: currentCohort.path,
  image: "/flyer/december?format=landscape",
});

const steps = [
  { title: "Register in one minute", description: "Pick your route below and fill in the short form." },
  { title: "Confirm your seat", description: `Daniel sends payment details on WhatsApp. Your seat is confirmed once your ${price} is received.` },
  { title: `Start ${currentCohort.shortDates.split(" – ")[0]}`, description: "Join the live cohort, build real projects and get feedback for the whole month." },
];

const faqs = [
  { question: "How much does it cost?", answer: `${price} for one skill route, for the full month. Every route costs the same.` },
  { question: "Is it live or recorded?", answer: "It's a live, interactive online cohort with Daniel. You can join from anywhere in the world." },
  { question: "Which route should I choose?", answer: "Choose the one closest to what you want to build. Tell us your experience on the form and Daniel will confirm it's the right fit before you pay." },
  { question: "Does registering guarantee my seat?", answer: "Registering reserves your interest. Your seat is confirmed once payment is received." },
  { question: "Can I get a refund?", answer: "Yes. You get a full refund if you cancel more than 7 days before the cohort starts. See the Refund Policy for the details." },
  { question: "Will I definitely earn money?", answer: "We teach practical skills you can sell and show you how to sell them, but results depend on you, so we can't guarantee any income." },
];

export default async function DecemberPage({ searchParams }: PageProps<"/december">) {
  const source = sourceFrom((await searchParams).ref);
  const included = trainingOfferings.find((o) => o.id === "mentorship")?.tiers.find((t) => /bootcamp/i.test(t.name))?.features ?? [];
  const withSource = (path: string) => (source ? `${path}?ref=${source}` : path);

  return (
    <>
      <section className="relative overflow-hidden border-b bg-mesh">
        <div className="container-page grid items-center gap-12 pt-28 pb-14 md:pt-36 md:pb-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="w-fit rounded-full border border-cta/50 bg-cta/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-cta uppercase">
              {currentCohort.title} · live online
            </p>
            <h1 className="mt-6 text-5xl leading-[1.02] font-extrabold sm:text-7xl">
              Step into 2027 with a <span className="text-gradient">new income stream.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              One focused month. One AI skill that pays. Build real projects live with Daniel Makonor and walk into the new year ready to earn.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <CalendarDays aria-hidden className="size-5 text-brand-text" />
                <dt className="sr-only">Dates</dt>
                <dd className="font-semibold">{currentCohort.dates}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 aria-hidden className="size-5 text-brand-text" />
                <dt className="sr-only">Location</dt>
                <dd className="font-semibold">100% online, worldwide</dd>
              </div>
              <div className="flex items-center gap-2">
                <Users aria-hidden className="size-5 text-brand-text" />
                <dt className="sr-only">Price</dt>
                <dd className="font-semibold">{price} for any route</dd>
              </div>
            </dl>
            <div className="mt-8">
              <Countdown />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="cta" size="xl">
                <a href="#routes">
                  Choose your route <ArrowRight aria-hidden />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href={whatsappUrl(`Hi Daniel, I have a question about the ${currentCohort.month} bootcamp.`)} target="_blank" rel="noopener noreferrer">
                  Ask Daniel on WhatsApp
                </a>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm lg:col-span-5">
            <ProfilePhoto priority />
          </div>
        </div>
      </section>

      <section id="routes" aria-labelledby="routes-title" className="section container-page scroll-mt-24">
        <SectionHeading id="routes-title" eyebrow="Choose your route" title="One month. One skill. Three ways to earn." description={`Every route is ${price} and runs ${currentCohort.dates}.`} />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {bootcamp.courses.map((b) => {
            const course = getCourse(b.slug);
            if (!course) return null;
            return (
              <li key={b.route} className="flex flex-col rounded-3xl border bg-card p-7">
                <p className="text-xs font-semibold tracking-widest text-brand-text uppercase">{b.track}</p>
                <h3 className="mt-3 text-2xl leading-tight font-bold">{b.headline.join(" ")}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{b.pitch}</p>
                <p className="mt-6 text-sm font-semibold">What you&apos;ll build</p>
                <ul className="mt-3 flex-1 space-y-2 text-sm">
                  {course.projects.map((p) => (
                    <li key={p.title} className="flex gap-2">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-text" />
                      {p.title}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="cta" size="lg" className="mt-7 w-full">
                  <Link href={withSource(registrationPath(b.route))}>Register for {b.track}</Link>
                </Button>
                <Link href={`/courses/${course.slug}`} className="mt-3 text-center text-sm font-medium text-brand-text underline-offset-4 hover:underline">
                  See the full curriculum
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section border-y bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">What&apos;s included</h2>
            <ul className="mt-6 space-y-4">
              {included.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-text" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold">How to join</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cta font-bold text-cta-foreground">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <TestimonialsSection items={testimonials.slice(0, 3)} title="What students say" />

      <section className="section container-page max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Before you register" />
        <FaqAccordion items={faqs} className="mt-10" />
        <div className="mt-10 text-center">
          <Button asChild variant="cta" size="xl">
            <a href="#routes">Register for {currentCohort.month}</a>
          </Button>
        </div>
      </section>
    </>
  );
}
