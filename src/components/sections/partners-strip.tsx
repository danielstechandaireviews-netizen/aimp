import Image from "next/image";
import { partners } from "@/content/testimonials";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";

export function PartnersStrip() {
  const anyPlaceholder = partners.some((p) => p.placeholder);
  return (
    <section aria-labelledby="partners-heading" className="border-y bg-surface py-12">
      <div className="container-page">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 id="partners-heading" className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            Communities &amp; partners
          </h2>
          {anyPlaceholder && <PlaceholderBadge label="Placeholder logos" />}
        </div>
        <ul className="mt-8 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p, i) => {
            const content = p.logo ? (
              <Image src={p.logo} alt={p.name} width={140} height={48} className="h-10 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
            ) : (
              <span className="font-display text-sm font-semibold text-muted-foreground">{p.name}</span>
            );
            return (
              <li
                key={`${p.name}-${i}`}
                className="flex h-16 items-center justify-center rounded-xl border border-dashed bg-card/50 px-3 text-center"
              >
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
