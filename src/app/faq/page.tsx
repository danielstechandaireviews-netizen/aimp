import { allFaqs, faqGroups } from "@/content/faqs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: "Answers to common questions about AIMoniPoint courses, training, AI services, payments, currencies and refunds.",
  path: "/faq",
  eyebrow: "FAQ",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know about courses, training, services, payments and refunds."
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
      />

      <div className="container-page grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <nav aria-label="FAQ sections" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:flex-col lg:gap-1">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="block rounded-full border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground lg:rounded-lg lg:border-0 lg:px-3 lg:py-2 lg:hover:bg-foreground/5"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-14 lg:col-span-9">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`}>
              <h2 id={`${g.id}-title`} className="mb-5 text-2xl font-bold">
                {g.title}
              </h2>
              <FaqAccordion items={g.items} />
            </section>
          ))}
        </div>
      </div>

      <CtaBanner title="Still have questions?" description="Book a free discovery call or send a message — we'll get back to you within 1–2 business days." secondary={{ label: "Contact us", href: "/contact" }} />
    </>
  );
}
