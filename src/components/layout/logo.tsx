import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand)" />
          <stop offset="1" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-g)" />
      <g stroke="var(--brand-foreground)" strokeWidth="1.6" strokeLinecap="round">
        <line x1="9" y1="22" x2="16" y2="10" />
        <line x1="16" y1="10" x2="23" y2="22" />
        <line x1="12" y1="17" x2="20" y2="17" />
      </g>
      <g fill="var(--brand-foreground)">
        <circle cx="9" cy="22" r="2.2" />
        <circle cx="16" cy="10" r="2.2" />
        <circle cx="23" cy="22" r="2.2" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 font-display text-lg font-bold", className)}>
      <LogoMark />
      <span>
        AIMoni<span className="text-brand-text">Point</span>
      </span>
      <span className="sr-only">— home</span>
    </Link>
  );
}
