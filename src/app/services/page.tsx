import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, GraduationCap, Lightbulb, Target, Wrench } from "lucide-react";
import { getCourse } from "@/content/courses";
import { faqGroups } from "@/content/faqs";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { Button } from "@/components/ui/button";
import { ServiceEnquiryForm } from "@/components/forms/service-enquiry-form";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CurrencySwitcher } from "@/components/shared/currency-switcher";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Price } from "@/components/shared/price";
import { SectionHeading } from "@/components/shared/section-heading";
import { icons } from "@/lib/icons";
import { buildMetadata, faqJsonLd, servicesJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Services for Small & Medium Businesses",
  description:
    "Rapid AI software development, AI automation and AI agents for small and medium businesses — delivered online, worldwide, in weeks not months.",
  path: "/services",
  eyebrow: "For small & medium businesses",
});

const process = [
  { title: "Free discovery call", text: "We learn how your business works and where AI can save time or win customers." },
  { title: "Clear scope & price", text: "A one-page scope with a fixed price and timeline — no surprises." },
  { title: "Rapid build", text: "We build in short cycles and show you progress as we go." },
  { title: "Launch & support", text: "Go live with training for your team, plus optional monthly care." },
];

export default function ServicesPage() {
  const faqs = faqGroups.find((g) => g.id === "services")!.items;
  return (
    <>
      <JsonLd data={servicesJsonLd(services)} />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHero
        eyebrow="For small & medium businesses"
        title={
          <>
            AI that saves your business time — <span className="text-gradient">built fast.</span>
          </>
        }
        description={`Rapid AI software, AI automation and AI agents for small and medium businesses. Delivered online to businesses in ${siteConfig.regionsServed.join(", ")}, ${siteConfig.regionsGrowing.join(", ")} and beyond.`}
        breadcrumbs={[{ name: "For businesses", path: "/services" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="cta" size="xl">
            <Link href="#enquire">Get a free quote</Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href="/contact#book">Book a discovery call</Link>
          </Button>
        </div>
      </PageHero>

      {/* Overview cards */}
      <section className="section container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading align="left" eyebrow="Three services" title="Pick what your business needs" />
          <CurrencySwitcher className="self-start md:self-end" />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="card-interactive group flex flex-col rounded-3xl border bg-card p-7"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-5 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
                <p className="mt-5 border-t pt-4 text-sm">
                  {s.startingAt ? (
                    <>
                      <span className="text-muted-foreground">From </span>
                      <Price price={s.startingAt} className="text-xl" />
                    </>
                  ) : (
                    <span className="font-semibold">Custom quote</span>
                  )}
                  <span className="block text-muted-foreground">{s.timeline}</span>
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-text">
                  See details <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Details */}
      <div className="border-t">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          const course = getCourse(s.learnCourse);
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className={i % 2 === 0 ? "section bg-surface" : "section"}
            >
              <div className="container-page grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <h2 id={`${s.slug}-title`} className="mt-5 text-3xl font-bold">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-lg text-muted-foreground">{s.summary}</p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div>
                      <dt className="flex items-center gap-2 font-semibold">
                        <CalendarClock aria-hidden className="size-5 shrink-0 text-brand-text" />
                        Typical timeline
                      </dt>
                      <dd className="pl-7 text-muted-foreground">{s.timeline}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 font-semibold">
                        <Target aria-hidden className="size-5 shrink-0 text-brand-text" />
                        Ideal for
                      </dt>
                      <dd className="pl-7 text-muted-foreground">{s.idealFor}</dd>
                    </div>
                  </dl>
                  {s.startingAt && (
                    <p className="mt-6 text-sm">
                      <span className="text-muted-foreground">Projects from </span>
                      <Price price={s.startingAt} className="text-2xl" />
                    </p>
                  )}
                  <Button asChild variant="cta" size="lg" className="mt-6">
                    <Link href={`/services?service=${encodeURIComponent(s.title)}#enquire`}>
                      Get a quote <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                  {course && (
                    <div className="mt-8 flex gap-3 rounded-2xl border border-dashed p-4 text-sm">
                      <GraduationCap aria-hidden className="mt-0.5 size-5 shrink-0 text-cta" />
                      <p>
                        <span className="font-semibold">Want to offer this service yourself?</span>{" "}
                        <span className="text-muted-foreground">Learn it in </span>
                        <Link href={`/courses/${course.slug}`} className="font-medium text-brand-text underline-offset-4 hover:underline">
                          {course.title}
                        </Link>
                        .
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid content-start gap-6 lg:col-span-7">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border bg-card p-6">
                      <h3 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">The problem</h3>
                      <p className="mt-3">{s.problem}</p>
                    </div>
                    <div className="rounded-2xl border border-brand/40 bg-card p-6">
                      <h3 className="text-sm font-semibold tracking-widest text-brand-text uppercase">How we solve it</h3>
                      <p className="mt-3">{s.solution}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border bg-card p-6">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Lightbulb aria-hidden className="size-4 text-cta" /> Popular examples
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.examples.map((e) => (
                        <li key={e} className="rounded-full bg-brand/10 px-3 py-1.5 text-sm text-brand-text">
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border bg-card p-6">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Wrench aria-hidden className="size-4 text-cta" /> What you get
                    </h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm">
                          <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-text" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Process */}
      <section className="section container-page" aria-labelledby="process-title">
        <SectionHeading id="process-title" eyebrow="How it works" title="Simple, fast and fixed-price" />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.title} className="rounded-3xl border bg-card p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand font-display font-bold text-brand-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Larger organisations: corporate programmes are planned for the future —{" "}
          <Link href="/contact" className="font-medium text-brand-text underline-offset-4 hover:underline">
            register your interest
          </Link>
          .
        </p>
      </section>

      <TestimonialsSection items={testimonials.filter((t) => t.context === "Services")} title="What business owners say" />

      <section id="enquire" className="section border-t bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Free quote"
              title="Tell us what you need"
              description="Share a few details about your business. You'll get a reply within 1–2 business days with next steps and a suggested time for a free call."
            />
            <div className="mt-10">
              <h3 className="font-semibold">Questions from business owners</h3>
              <FaqAccordion items={faqs} className="mt-4" />
            </div>
          </div>
          <div className="rounded-3xl border bg-card p-6 sm:p-8 lg:col-span-7">
            <Suspense fallback={<p className="text-muted-foreground">Loading form…</p>}>
              <ServiceEnquiryForm services={services.map((s) => s.title)} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
