import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { faqGroups } from "@/content/faqs";
import { testimonials } from "@/content/testimonials";
import { howItWorks, trainingOfferings } from "@/content/training";
import { Button } from "@/components/ui/button";
import { TrainingEnquiryForm } from "@/components/forms/training-enquiry-form";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CurrencySwitcher } from "@/components/shared/currency-switcher";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { PricingTable } from "@/components/shared/pricing-table";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { icons } from "@/lib/icons";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Mentorship & Online Cohorts — Learn AI Skills That Pay",
  description:
    "1-on-1 AI income mentorship and live online cohorts for communities worldwide. Learn AI skills, build a portfolio and turn it into multiple streams of income.",
  path: "/training",
  eyebrow: "Training",
});

export default function TrainingPage() {
  const faqs = faqGroups.find((g) => g.id === "training")!.items;
  const trainingTestimonials = testimonials.filter((t) => ["Mentorship", "Community", "Course"].includes(t.context));

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="Training"
        title={
          <>
            Mentorship & cohorts that turn AI skills into <span className="text-gradient">income</span>
          </>
        }
        description="Live, practical, income-focused AI training — from one-on-one mentorship to online cohorts for communities anywhere in the world."
        breadcrumbs={[{ name: "Training", path: "/training" }]}
      >
        <nav aria-label="Training options" className="flex flex-wrap gap-2">
          {trainingOfferings.map((o) => (
            <Button key={o.id} asChild variant="glass" size="lg">
              <Link href={`#${o.id}`}>{o.title}</Link>
            </Button>
          ))}
        </nav>
      </PageHero>

      {trainingOfferings.map((o, idx) => {
        const Icon = icons[o.icon];
        return (
          <section key={o.id} id={o.id} className={idx % 2 === 1 ? "section border-y bg-surface" : "section"}>
            <div className="container-page">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{o.title}</h2>
                  <p className="mt-3 text-lg text-brand-text">{o.summary}</p>
                  <p className="mt-4 text-muted-foreground">{o.description}</p>
                </div>
                <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7 lg:pt-16">
                  {o.benefits.map((b) => (
                    <li key={b} className="flex gap-3 rounded-xl border bg-card p-4">
                      <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-text" />
                      <span className="text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12">
                {o.tiers.some((t) => t.price) && (
                  <div className="mb-6 flex items-center justify-end gap-3">
                    <span className="text-sm text-muted-foreground">Prices in</span>
                    <CurrencySwitcher />
                  </div>
                )}
                <PricingTable tiers={o.tiers} />
              </div>
            </div>
          </section>
        );
      })}

      {/* How it works */}
      <section className="section container-page" aria-labelledby="how-title">
        <SectionHeading id="how-title" eyebrow="How it works" title="From first call to first income" />
        <Reveal className="relative mt-14">
          <div aria-hidden className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-brand via-violet to-cta md:block" />
          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
            {howItWorks.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-background font-display text-lg font-bold text-brand-text">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold md:mt-4">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <p className="container-page -mt-8 pb-8 text-center text-sm text-muted-foreground">
        Corporate team training isn&apos;t offered yet — it&apos;s planned for the future.{" "}
        <Link href="/contact" className="font-medium text-brand-text underline-offset-4 hover:underline">
          Register your interest
        </Link>
        .
      </p>

      <TestimonialsSection items={trainingTestimonials} title="What participants say" />

      {/* Enquiry */}
      <section id="enquire" className="section border-t bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Enquire"
              title="Tell us about your training needs"
              description="Share a few details and you'll receive a reply within 1–2 business days — usually with a suggested time for a free discovery call."
            />
            <div className="mt-10">
              <h3 className="font-semibold">Training FAQs</h3>
              <FaqAccordion items={faqs} className="mt-4" />
            </div>
          </div>
          <div className="rounded-3xl border bg-card p-6 sm:p-8 lg:col-span-7">
            <TrainingEnquiryForm offerings={trainingOfferings.map((o) => o.title)} />
          </div>
        </div>
      </section>
    </>
  );
}
