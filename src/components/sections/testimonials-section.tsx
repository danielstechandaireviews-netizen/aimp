import type { Testimonial } from "@/content/types";
import { testimonials as allTestimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { Reveal } from "@/components/shared/reveal";

export function TestimonialsSection({
  items = allTestimonials.slice(0, 3),
  title = "What learners and clients say",
  eyebrow = "Testimonials",
}: {
  items?: Testimonial[];
  title?: string;
  eyebrow?: string;
}) {
  if (!items.length) return null;
  const anyPlaceholder = items.some((t) => t.placeholder);
  return (
    <section className="section container-page">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={
          anyPlaceholder
            ? "These are placeholders — real, verified testimonials will be added here."
            : "Real feedback from students, communities and clients."
        }
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={`${t.name}-${i}`} delay={i * 0.06} className="h-full">
            <TestimonialCard testimonial={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
