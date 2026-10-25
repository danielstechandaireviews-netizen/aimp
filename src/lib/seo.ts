import type { Metadata } from "next";
import { siteConfig, isPlaceholder } from "@/content/site";
import type { Course, FaqItem, Service } from "@/content/types";
import { absoluteUrl } from "@/lib/utils";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Small label shown above the title on the generated OG image. */
  eyebrow?: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** Pass false to skip the "| AIMoniPoint" suffix (e.g. home page). */
  titleTemplate?: boolean;
  noIndex?: boolean;
}

export function ogImageUrl(title: string, eyebrow?: string) {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/og?${params.toString()}`;
}

/** Builds unique metadata, canonical URL and OG/Twitter image for a page. */
export function buildMetadata({
  title,
  description,
  path,
  eyebrow,
  type = "website",
  publishedTime,
  titleTemplate = true,
  noIndex,
}: PageMeta): Metadata {
  const image = ogImageUrl(title, eyebrow);
  return {
    title: titleTemplate ? title : { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: siteConfig.name,
      locale: "en_GB",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

const sameAs = Object.values(siteConfig.socials).filter((u) => u && !isPlaceholder(u));

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#daniel"),
  name: siteConfig.owner.name,
  jobTitle: siteConfig.owner.jobTitle,
  image: absoluteUrl(siteConfig.owner.image),
  url: absoluteUrl("/about"),
  worksFor: { "@id": absoluteUrl("/#organization") },
  knowsAbout: [
    "AI Software Development",
    "AI Automation",
    "AI Agents",
    "AI education",
    "AI education",
    "Business Data Analysis",
    "Data Engineering",
    "Software Engineering",
    "Large Language Models",
    "Retrieval-Augmented Generation",
  ],
  ...(sameAs.length ? { sameAs } : {}),
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": absoluteUrl("/#organization"),
  name: siteConfig.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.svg"),
  description: siteConfig.description,
  founder: { "@id": absoluteUrl("/#daniel") },
  areaServed: "Worldwide",
  slogan: siteConfig.tagline,
  ...(sameAs.length ? { sameAs } : {}),
};

export function courseJsonLd(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: absoluteUrl(`/courses/${course.slug}`),
    educationalLevel: course.level,
    inLanguage: "en",
    provider: { "@type": "Organization", name: siteConfig.name, sameAs: absoluteUrl("/") },
    instructor: { "@type": "Person", name: siteConfig.owner.name },
    teaches: course.outcomes,
    offers: (["CAD", "USD", "GBP", "EUR"] as const).map((currency) => ({
      "@type": "Offer",
      category: "Paid",
      price: course.price[currency],
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/courses/${course.slug}`),
    })),
    hasCourseInstance: course.formats.map((f) => ({
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: course.duration,
      name: `${course.title} (${f})`,
    })),
    ...(course.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: course.rating.value,
            reviewCount: course.rating.count,
          },
        }
      : {}),
  };
}

export function servicesJsonLd(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      "@id": absoluteUrl(`/services#${s.slug}`),
      name: s.title,
      description: s.summary,
      serviceType: s.title,
      provider: { "@id": absoluteUrl("/#organization") },
      areaServed: "Worldwide",
      audience: { "@type": "BusinessAudience", name: "Small and medium businesses" },
      ...(s.startingAt
        ? { offers: { "@type": "Offer", price: s.startingAt.USD, priceCurrency: "USD", description: "Starting price" } }
        : {}),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
