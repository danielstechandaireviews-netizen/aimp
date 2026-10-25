import { CheckCircle2, FileText } from "lucide-react";
import { siteConfig } from "@/content/site";
import { LeadMagnetForm } from "@/components/forms/lead-magnet-form";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Free Download: ${siteConfig.leadMagnet.title}`,
  description: siteConfig.leadMagnet.description,
  path: "/free-resources",
  eyebrow: "Free resource",
});

const inside = [
  "The three AI skill tracks compared: AI Software Development, AI Automation and AI Agents",
  "The skills and tools to learn at each stage — beginner to advanced",
  "Portfolio projects small businesses will actually pay for",
  "Six income streams you can build with AI skills — and which to start with",
  "A 90-day action plan from first lesson to first client",
];

export default function FreeResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Free resource"
        title={
          <>
            Get <span className="text-gradient">{siteConfig.leadMagnet.title}</span>
          </>
        }
        description={siteConfig.leadMagnet.description}
        breadcrumbs={[{ name: "Free resources", path: "/free-resources" }]}
      />

      <section className="section container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-cta/20">
              <FileText aria-hidden className="size-7" />
            </span>
            <div>
              <h2 className="text-2xl font-bold">What&apos;s inside</h2>
              <p className="text-sm text-muted-foreground">PDF guide · free</p>
            </div>
          </div>
          <ul className="mt-8 space-y-4">
            {inside.map((i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-text" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            [Placeholder — update this list to match the final contents of your roadmap PDF.]
          </p>
        </div>
        <div className="lg:col-span-6">
          <div className="rounded-3xl border bg-card p-6 glow-ring sm:p-8">
            <h2 className="text-xl font-bold">Where should we send it?</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">Enter your details to download the roadmap instantly.</p>
            <LeadMagnetForm />
          </div>
        </div>
      </section>
    </>
  );
}
