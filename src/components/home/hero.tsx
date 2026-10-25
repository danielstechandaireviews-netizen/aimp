import Link from "next/link";
import { ArrowRight, Briefcase, Globe2, LayoutTemplate, Package, Repeat, Sparkles } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { TextRotator } from "@/components/interactive/text-rotator";
import { ProfilePhoto } from "@/components/shared/profile-photo";

/* Conceptual income streams orbiting the portrait — not claims or results. */
const streams = [
  { label: "Freelance AI projects", icon: Briefcase, className: "left-0 top-[10%] -translate-x-[22%]", delay: "0s" },
  { label: "Monthly retainers", icon: Repeat, className: "right-0 top-[30%] translate-x-[16%]", delay: "1.2s" },
  { label: "Templates & products", icon: Package, className: "left-0 top-[52%] -translate-x-[26%]", delay: "2.4s" },
  { label: "Your own AI micro-SaaS", icon: LayoutTemplate, className: "right-0 top-[66%] translate-x-[12%]", delay: "0.6s" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-mesh absolute inset-0 -z-10" />
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000,transparent)]" />

      <div className="container-page grid items-center gap-12 pt-28 pb-16 md:pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand-text">
            <Sparkles aria-hidden className="size-3.5" />
            Online AI academy · open to learners worldwide
          </p>

          <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Learn AI skills.
            <span className="text-gradient block">Build multiple streams of income.</span>
          </h1>

          <p className="mt-6 font-display text-xl font-semibold sm:text-2xl">
            Get paid to build{" "}
            <TextRotator
              className="text-brand-text"
              words={["AI automations", "AI agents", "AI chatbots", "AI apps"]}
            />{" "}
            <span className="block sm:inline">for small businesses.</span>
          </p>

          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Practical, project-based training in AI Software Development, AI Automation and AI Agents — the hard skills to
            earn from freelance projects, monthly retainers, templates and your own AI products. Taught by{" "}
            {siteConfig.owner.name}, who has helped <strong className="font-semibold text-foreground">over 400 students globally</strong>{" "}
            build AI skills.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cta" size="xl">
              <Link href="#path-quiz">
                Find my AI income path <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link href="/courses">Explore courses</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-2xl border bg-card/60 p-4 backdrop-blur">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Students taught online in</p>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-medium">
                <Globe2 aria-hidden className="size-4 text-brand-text" />
                {siteConfig.regionsServed.join(" · ")}
              </p>
            </div>
            <div className="rounded-2xl border border-dashed bg-card/40 p-4">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Now growing across</p>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-medium">
                <Globe2 aria-hidden className="size-4 text-cta" />
                {siteConfig.regionsGrowing.join(" · ")} & beyond
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <ProfilePhoto priority sizes="(min-width: 1024px) 40vw, (min-width: 640px) 448px, 90vw" />
          {streams.map(({ label, icon: Icon, className, delay }) => (
            <div key={label} aria-hidden className={`absolute hidden sm:block ${className}`}>
              <div
                className="flex animate-float items-center gap-2 rounded-2xl border bg-background/85 px-3 py-2 text-sm font-semibold shadow-xl backdrop-blur-md motion-reduce:animate-none"
                style={{ animationDelay: delay }}
              >
                <span className="inline-flex size-7 items-center justify-center rounded-lg bg-cta text-cta-foreground">
                  <Icon className="size-4" />
                </span>
                {label}
              </div>
            </div>
          ))}
          <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-2xl border bg-background/85 p-4 backdrop-blur-md">
            <div>
              <p className="font-display text-sm font-bold">{siteConfig.owner.name}</p>
              <p className="text-xs text-muted-foreground">AI Skill Educator · AIMoniPoint</p>
            </div>
            <Link href="/about" className="inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap text-brand-text">
              My story <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
