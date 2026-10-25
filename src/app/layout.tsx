import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { siteConfig } from "@/content/site";
import { Analytics } from "@/components/layout/analytics";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/layout/providers";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { JsonLd } from "@/components/shared/json-ld";
import { ogImageUrl, organizationJsonLd, personJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Learn AI Skills That Pay`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner.name, url: "/about" }],
  creator: siteConfig.owner.name,
  keywords: [
    "AI courses",
    "learn AI skills",
    "AI side hustle",
    "multiple streams of income",
    "AI automation course",
    "AI agents course",
    "AI software development",
    "n8n",
    "AI freelancing",
    "AI services for small business",
    "Daniel Makonor",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_GB",
    url: "/",
    images: [{ url: ogImageUrl(siteConfig.tagline, "AIMoniPoint"), width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0c1d" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} dark`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
          <Analytics />
        </Providers>
        <JsonLd data={personJsonLd} />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
