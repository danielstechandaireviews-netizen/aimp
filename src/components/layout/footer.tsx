import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { footerNav, siteConfig, isPlaceholder, whatsappUrl } from "@/content/site";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialIcons } from "@/components/shared/social-icons";
import { CookieSettingsButton } from "./cookie-banner";
import { Logo } from "./logo";

export function Footer() {
  const email = siteConfig.contact.email;
  return (
    <footer className="relative border-t bg-surface">
      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {siteConfig.tagline} Learn AI hard skills, build multiple streams of income — and get AI built for your small business. By {siteConfig.owner.name}.
          </p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-text" />
              <span>
                100% online. Students taught in {siteConfig.regionsServed.join(" · ")} — now growing across{" "}
                {siteConfig.regionsGrowing.join(", ")} &amp; beyond.
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Mail aria-hidden className="size-4 text-brand-text" />
              {isPlaceholder(email) ? (
                <span>{email}</span>
              ) : (
                <a href={`mailto:${email}`} className="hover:text-foreground">
                  {email}
                </a>
              )}
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle aria-hidden className="size-4 text-brand-text" />
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                WhatsApp {siteConfig.contact.whatsappDisplay}
              </a>
            </p>
          </div>
          <SocialIcons showPlaceholders className="mt-6" />
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
          {Object.entries(footerNav).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className="text-sm font-semibold">{heading}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 rounded-2xl border bg-card p-6 sm:col-span-4">
            <h2 className="font-display text-lg font-semibold">Get AI income ideas in your inbox</h2>
            <NewsletterForm className="mt-4 max-w-xl" />
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/legal/refunds" className="hover:text-foreground">
              Refunds
            </Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
