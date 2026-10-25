import { Suspense } from "react";
import { Clock, Globe2, Mail } from "lucide-react";
import { siteConfig, isPlaceholder } from "@/content/site";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactFormWithTopic } from "@/components/forms/contact-form-with-topic";
import { CalendlyEmbed } from "@/components/shared/calendly-embed";
import { PageHero } from "@/components/shared/page-hero";
import { SocialIcons } from "@/components/shared/social-icons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact & Book a Discovery Call",
  description:
    "Get in touch with Daniel Makonor about AI courses, mentorship, team training or AI services — or book a free discovery call.",
  path: "/contact",
  eyebrow: "Contact",
});

export default function ContactPage() {
  const email = siteConfig.contact.email;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-gradient">your AI goals</span>
          </>
        }
        description="Book a free 30-minute discovery call, or send a message and you'll hear back within 1–2 business days."
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="section container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-bold">Send a message</h2>
          <div className="mt-6 rounded-3xl border bg-card p-6 sm:p-8">
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithTopic />
            </Suspense>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl border bg-card p-6 sm:p-8">
            <h2 className="text-lg font-bold">Other ways to reach us</h2>
            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="flex items-center gap-2 font-semibold">
                  <Mail aria-hidden className="size-5 shrink-0 text-brand-text" />
                  Email
                </dt>
                <dd className="text-muted-foreground pl-7">{isPlaceholder(email) ? email : <a href={`mailto:${email}`} className="hover:text-foreground">{email}</a>}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-semibold">
                  <Globe2 aria-hidden className="size-5 shrink-0 text-brand-text" />
                  Where we work
                </dt>
                <dd className="text-muted-foreground pl-7">100% online — students taught in {siteConfig.regionsServed.join(", ")}; now growing across {siteConfig.regionsGrowing.join(", ")} &amp; beyond</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-semibold">
                  <Clock aria-hidden className="size-5 shrink-0 text-brand-text" />
                  Response time
                </dt>
                <dd className="text-muted-foreground pl-7">Within 1–2 business days</dd>
              </div>
            </dl>
            <div className="mt-6 border-t pt-6">
              <p className="text-sm font-semibold">Follow along</p>
              <SocialIcons showPlaceholders className="mt-3" />
            </div>
          </div>
        </aside>
      </section>

      <section id="book" aria-labelledby="book-title" className="section border-t bg-surface">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand-text uppercase">Free discovery call</p>
            <h2 id="book-title" className="mt-3 text-3xl font-bold sm:text-4xl">
              Book a 30-minute call
            </h2>
            <p className="mt-3 text-muted-foreground">
              We&apos;ll talk through your goals and the best way forward — a course, mentorship, team training or a project. No
              obligation.
            </p>
          </div>
          <CalendlyEmbed className="mt-10" />
        </div>
      </section>
    </>
  );
}
