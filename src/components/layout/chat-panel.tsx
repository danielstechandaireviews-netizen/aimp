"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, CalendarDays, ExternalLink, GraduationCap, Mail, MessageCircle, RotateCcw, Send, User, X } from "lucide-react";
import type { Price as PriceType } from "@/content/types";
import { Price } from "@/components/shared/price";

export interface ChatOffer {
  id: string;
  title: string;
  subtitle?: string;
  price: PriceType | null;
  priceSuffix?: string;
  /** Shows "From" before the price (indicative service pricing). */
  fromPrice?: boolean;
  /** Selfany checkout link, or null when none is set yet. */
  payUrl: string | null;
  detailsHref: string;
  whatsappText: string;
}

type Topic = "start" | "bootcamps" | "courses" | "mentorship" | "services" | "whatsapp" | "fallback";

type Message =
  | { id: number; from: "user"; text: string }
  | { id: number; from: "bot"; topic: Topic; text: string; note?: string };

const intro: Record<Topic, string> = {
  start: "Hi 👋 I'm Daniel's assistant. I can help you join a bootcamp, enrol in a course, book mentorship, get AI built for your business, or reach Daniel directly. What would you like to do?",
  bootcamps: "Every quarter (March, June, September and December), three courses run as 1-month live bootcamps for $200. Pick your track:",
  courses: "Here are the courses. Tap “Pay on Selfany” to enrol securely, or ask Daniel a question first on WhatsApp.",
  mentorship: "Work 1-on-1 with Daniel. Pick a package and pay on Selfany, or chat on WhatsApp to find the right fit.",
  services: "Daniel builds AI software, automations and agents for small and medium businesses. Every project is quoted to fit, so the quickest way to start is a WhatsApp chat or a quote request.",
  whatsapp: "Daniel usually replies on WhatsApp within a few hours. Tap below to open the chat. Your message is pre-filled.",
  fallback: "Thanks! The best person to answer that is Daniel himself. Send it to him on WhatsApp and he'll get back to you.",
};

const menu: { topic: Topic; label: string; icon: typeof GraduationCap }[] = [
  { topic: "bootcamps", label: "Join a $200 bootcamp", icon: CalendarDays },
  { topic: "courses", label: "Buy a course", icon: GraduationCap },
  { topic: "mentorship", label: "1-on-1 mentorship", icon: User },
  { topic: "services", label: "AI for my business", icon: Briefcase },
  { topic: "whatsapp", label: "Chat with Daniel on WhatsApp", icon: MessageCircle },
];

/** Routes free-text questions to the closest topic. */
function matchTopic(text: string): Topic {
  const t = text.toLowerCase();
  if (/whats\s?app|call|talk|speak|phone|human|daniel/.test(t)) return "whatsapp";
  if (/bootcamp|cohort|quarter|\$?200\b/.test(t)) return "bootcamps";
  if (/mentor|coach|1.on.1|one.on.one|session|sprint|accelerator/.test(t)) return "mentorship";
  if (/business|company|quote|build (me|us)|automate my|agent for|client|hire/.test(t)) return "services";
  if (/course|learn|enrol|enroll|class|n8n|rag|mcp|buy|pay|price|cost|selfany/.test(t)) return "courses";
  return "fallback";
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.4z" />
    </svg>
  );
}

/** Client side of the chat assistant: guided menu, offer cards and free-text routing. */
export function ChatPanel({
  courses,
  bootcamps,
  mentorship,
  services,
  whatsappNumber,
  email,
}: {
  courses: ChatOffer[];
  bootcamps: ChatOffer[];
  mentorship: ChatOffer[];
  services: ChatOffer[];
  whatsappNumber: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", topic: "start", text: intro.start }]);
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const wa = (text: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  const offers: Partial<Record<Topic, ChatOffer[]>> = { bootcamps, courses, mentorship, services };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function reply(userText: string, topic: Topic, note?: string) {
    const userId = nextId.current++;
    const botId = nextId.current++;
    setMessages((m) => [...m, { id: userId, from: "user", text: userText }, { id: botId, from: "bot", topic, text: intro[topic], note }]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const topic = matchTopic(text);
    // Questions we can't route are handed to Daniel verbatim on WhatsApp.
    reply(text, topic, topic === "fallback" || topic === "whatsapp" ? text : undefined);
  }

  function restart() {
    nextId.current = 1;
    setMessages([{ id: 0, from: "bot", topic: "start", text: intro.start }]);
  }

  const lastBotId = [...messages].reverse().find((m) => m.from === "bot")?.id;

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Chat with AIMoniPoint"
          className="fixed inset-x-3 bottom-24 z-50 flex max-h-[min(640px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-black/40 sm:inset-x-auto sm:right-6 sm:w-[400px]"
        >
          <header className="flex items-center gap-3 border-b bg-surface px-4 py-3">
            <span className="relative inline-flex size-10 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-brand-foreground">
              DM
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-[#25D366] ring-2 ring-surface" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold">AIMoniPoint assistant</p>
              <p className="text-xs text-muted-foreground">Pay on Selfany · or chat with Daniel</p>
            </div>
            <button
              type="button"
              onClick={restart}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Start over"
              title="Start over"
            >
              <RotateCcw className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Close chat"
            >
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4" aria-live="polite">
            {messages.map((m) =>
              m.from === "user" ? (
                <p key={m.id} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand px-3.5 py-2 text-sm text-brand-foreground">
                  {m.text}
                </p>
              ) : (
                <div key={m.id} className="space-y-2.5">
                  <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-foreground/5 px-3.5 py-2 text-sm">{m.text}</p>

                  {m.topic === "start" && m.id === lastBotId && (
                    <div className="flex flex-col gap-2">
                      {menu.map(({ topic, label, icon: Icon }) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => reply(label, topic)}
                          className="flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors hover:border-brand hover:bg-brand/10"
                        >
                          <Icon className="size-4 shrink-0 text-brand-text" aria-hidden />
                          {label}
                        </button>
                      ))}
                    </div>
                  )}

                  {offers[m.topic]?.map((o) => (
                    <div key={o.id} className="rounded-2xl border bg-background/40 p-3.5">
                      <p className="text-sm font-semibold leading-snug">{o.title}</p>
                      {o.subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{o.subtitle}</p>}
                      <p className="mt-1.5 text-sm">
                        {o.price ? (
                          <>
                            {o.fromPrice && <span className="mr-1 text-xs text-muted-foreground">From</span>}
                            <Price price={o.price} suffix={o.priceSuffix} />
                          </>
                        ) : (
                          <span className="text-muted-foreground">Custom quote</span>
                        )}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {o.payUrl ? (
                          <a
                            href={o.payUrl}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-cta px-3 py-1.5 text-xs font-semibold text-cta-foreground hover:bg-cta/90"
                          >
                            Pay on Selfany <ExternalLink className="size-3" aria-hidden />
                            <span className="sr-only">(opens secure checkout in a new tab)</span>
                          </a>
                        ) : m.topic === "services" ? (
                          <Link
                            href="/services#enquire"
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center rounded-lg bg-cta px-3 py-1.5 text-xs font-semibold text-cta-foreground hover:bg-cta/90"
                          >
                            Request a quote
                          </Link>
                        ) : null}
                        <a
                          href={wa(o.whatsappText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-[#06301a] hover:bg-[#25D366]/90"
                        >
                          <WhatsAppGlyph className="size-3.5" /> {o.payUrl ? "Ask first" : "WhatsApp"}
                        </a>
                        <Link
                          href={o.detailsHref}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-foreground/5"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}

                  {(m.topic === "whatsapp" || m.topic === "fallback") && (
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={wa(m.note ?? "Hi Daniel, I found AIMoniPoint and I'd like to ask about…")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-[#06301a] hover:bg-[#25D366]/90"
                      >
                        <WhatsAppGlyph className="size-4" /> Open WhatsApp chat
                      </a>
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-foreground/5"
                      >
                        <Mail className="size-4" aria-hidden /> Email instead
                      </a>
                    </div>
                  )}

                  {m.topic !== "start" && m.id === lastBotId && (
                    <button
                      type="button"
                      onClick={() => reply("Show me the other options", "start")}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-text hover:underline"
                    >
                      <ArrowLeft className="size-3.5" aria-hidden /> Other options
                    </button>
                  )}
                </div>
              ),
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t p-3">
            <label htmlFor="chat-input" className="sr-only">
              Type your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask a question…"
              autoComplete="off"
              maxLength={500}
              className="h-10 min-w-0 flex-1 rounded-full border bg-background/60 px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-opacity disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="size-4" aria-hidden />
            </button>
          </form>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with us: pay for a course or message Daniel"}
        className="fixed right-4 bottom-4 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-brand px-4 text-brand-foreground shadow-lg shadow-black/30 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
      >
        {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
        {!open && <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>}
      </button>
    </>
  );
}
