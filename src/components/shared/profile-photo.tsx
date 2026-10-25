import Image from "next/image";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Daniel's portrait, framed for a dark-background studio photo:
 * a soft teal/violet glow behind, a subtle grid, and a fade into the page at the bottom.
 */
export function ProfilePhoto({
  priority = false,
  className,
  sizes = "(min-width: 1024px) 480px, 90vw",
  fade = true,
}: {
  priority?: boolean;
  className?: string;
  sizes?: string;
  fade?: boolean;
}) {
  return (
    <div className={cn("relative isolate", className)}>
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,var(--glow-brand),transparent)] blur-2xl" />
      <div aria-hidden className="absolute inset-x-6 -bottom-4 -z-10 h-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-violet),transparent)] blur-3xl" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border bg-[oklch(0.17_0.03_285)] glow-ring">
        <Image
          src={siteConfig.owner.image}
          alt={`${siteConfig.owner.name}, AI Skill Educator at AIMoniPoint, smiling in a grey hoodie beside a podcast microphone`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
        {fade && (
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[oklch(0.15_0.028_285)] to-transparent" />
        )}
      </div>
    </div>
  );
}
