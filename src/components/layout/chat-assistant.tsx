import { bootcamp } from "@/content/bootcamps";
import { courses, getCourse } from "@/content/courses";
import { services } from "@/content/services";
import { isPlaceholder, siteConfig } from "@/content/site";
import { trainingOfferings } from "@/content/training";
import { ChatPanel, type ChatOffer } from "./chat-panel";

/** First real checkout link: the item's own Selfany URL, then the store home. */
function payLink(url?: string) {
  if (url && !isPlaceholder(url)) return url;
  if (!isPlaceholder(siteConfig.storeUrl)) return siteConfig.storeUrl;
  return null;
}

/**
 * Floating chat assistant. Guides visitors to pay on Selfany or message Daniel on WhatsApp.
 * Only the slim data the chat needs is sent to the client, not the full course content.
 */
export function ChatAssistant() {
  if (!siteConfig.features.chatWidget) return null;

  const courseOffers: ChatOffer[] = courses.map((c) => ({
    id: c.slug,
    title: c.title,
    subtitle: `${c.level} · ${c.duration}`,
    price: c.price,
    payUrl: payLink(c.purchaseUrl),
    detailsHref: `/courses/${c.slug}`,
    whatsappText: `Hi Daniel, I'm interested in the "${c.title}" course.`,
  }));

  const bootcampOffers: ChatOffer[] = bootcamp.courses.map((b) => ({
    id: b.slug,
    title: `${b.track} bootcamp`,
    subtitle: `${bootcamp.duration} · live cohort · ${getCourse(b.slug)?.title ?? ""}`,
    price: bootcamp.price,
    payUrl: payLink(b.purchaseUrl),
    detailsHref: "/courses#bootcamps",
    whatsappText: `Hi Daniel, I'd like to join the next ${b.track} bootcamp.`,
  }));

  const mentorship = trainingOfferings.find((t) => t.id === "mentorship");
  const mentorshipOffers: ChatOffer[] = (mentorship?.tiers ?? []).map((t) => ({
    id: t.name,
    title: t.name,
    subtitle: t.description,
    price: t.price,
    priceSuffix: t.priceSuffix,
    payUrl: payLink(t.purchaseUrl),
    detailsHref: "/training#mentorship",
    whatsappText: `Hi Daniel, I'm interested in the "${t.name}" mentorship package.`,
  }));

  const serviceOffers: ChatOffer[] = services.map((s) => ({
    id: s.slug,
    title: s.shortTitle,
    subtitle: s.timeline,
    price: s.startingAt,
    fromPrice: true,
    payUrl: null,
    detailsHref: `/services#${s.slug}`,
    whatsappText: `Hi Daniel, I'd like a quote for ${s.shortTitle} for my business.`,
  }));

  return (
    <ChatPanel
      courses={courseOffers}
      bootcamps={bootcampOffers}
      mentorship={mentorshipOffers}
      services={serviceOffers}
      whatsappNumber={siteConfig.contact.whatsapp}
      email={siteConfig.contact.email}
    />
  );
}
