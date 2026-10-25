"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight, CalendarDays, ChevronDown, Download, Menu } from "lucide-react";
import { mainNav } from "@/content/site";
import type { AiArea, Course, IconName } from "@/content/types";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CurrencySwitcher } from "@/components/shared/currency-switcher";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export interface MegaMenuData {
  areas: { slug: string; title: string; summary: string; icon: IconName; kind: AiArea["kind"] }[];
  courses: { slug: string; title: string; level: Course["level"]; area: string }[];
}

type MegaKey = "areas" | "courses";

export function SiteHeader({ data }: { data: MegaMenuData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<MegaKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on Escape or click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        headerRef.current?.querySelector<HTMLButtonElement>(`[data-mega="${open}"]`)?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-border bg-background/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-brand px-4 py-2 font-semibold text-brand-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.mega ? (
                <li key={item.href}>
                  <button
                    type="button"
                    data-mega={item.mega}
                    aria-expanded={open === item.mega}
                    aria-controls={`mega-${item.mega}`}
                    onClick={() => setOpen(open === item.mega ? null : item.mega!)}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpen(item.mega!);
                    }}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                      isActive(item.href) || open === item.mega ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className={cn("size-3.5 transition-transform", open === item.mega && "rotate-180")}
                    />
                  </button>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setOpen(null)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                      isActive(item.href) ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CurrencySwitcher compact className="hidden 2xl:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button asChild variant="cta" className="hidden h-10 rounded-full px-5 sm:inline-flex">
            <Link href="/contact#book">
              <CalendarDays aria-hidden />
              Free Call
            </Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-10 items-center justify-center rounded-full border bg-foreground/5 xl:hidden"
              >
                <Menu aria-hidden className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <MobileNav data={data} onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            key={open}
            id={`mega-${open}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full hidden border-b bg-background/95 shadow-2xl backdrop-blur-xl xl:block"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(null);
            }}
          >
            <div className="container-page py-8">
              {open === "areas" ? <AreasPanel data={data} /> : <CoursesPanel data={data} />}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function AreasPanel({ data }: { data: MegaMenuData }) {
  const pillars = data.areas.filter((a) => a.kind === "pillar");
  const disciplines = data.areas.filter((a) => a.kind === "discipline");
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-6">
        <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Skill tracks that pay</p>
        <ul className="space-y-2">
          {pillars.map((a) => {
            const Icon = icons[a.icon];
            return (
              <li key={a.slug}>
                <Link href={`/ai-areas/${a.slug}`} className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-foreground/5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-text">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{a.title}</span>
                    <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{a.summary}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-span-3">
        <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Supporting skills</p>
        <MenuList items={disciplines.map((a) => ({ href: `/ai-areas/${a.slug}`, label: a.title }))} />
      </div>
      <div className="col-span-3 flex flex-col justify-between rounded-2xl border bg-surface p-5">
        <div>
          <p className="font-semibold">Turn skills into income</p>
          <p className="mt-1 text-sm text-muted-foreground">See six ways to earn with AI — and build your own income stack.</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Button asChild variant="cta" size="sm">
            <Link href="/income-streams">Explore income streams</Link>
          </Button>
          <Link href="/ai-areas" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-text">
            All AI skills <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CoursesPanel({ data }: { data: MegaMenuData }) {
  const pillars = data.areas.filter((a) => a.kind === "pillar");
  return (
    <div className="grid grid-cols-12 gap-8">
      {pillars.map((p) => (
        <div key={p.slug} className="col-span-3">
          <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">{p.title}</p>
          <MenuList
            items={data.courses
              .filter((c) => c.area === p.slug)
              .map((c) => ({ href: `/courses/${c.slug}`, label: c.title, meta: c.level }))}
          />
        </div>
      ))}
      <div className="col-span-3 flex flex-col justify-between rounded-2xl border bg-surface p-5">
        <div>
          <p className="font-semibold">Not sure where to start?</p>
          <p className="mt-1 text-sm text-muted-foreground">Get the free AI Career Roadmap and find your path.</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Button asChild variant="brand" size="sm">
            <Link href="/free-resources">
              <Download aria-hidden /> Free roadmap
            </Link>
          </Button>
          <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-text">
            Browse all courses <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MenuList({ items }: { items: { href: string; label: string; meta?: string }[] }) {
  return (
    <ul className="space-y-1">
      {items.map((i) => (
        <li key={i.href}>
          <Link href={i.href} className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-foreground/5">
            <span className="font-medium">{i.label}</span>
            {i.meta && <span className="mt-0.5 block text-xs text-muted-foreground">{i.meta}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileNav({ data, onNavigate }: { data: MegaMenuData; onNavigate: () => void }) {
  return (
    <div className="flex min-h-full flex-col gap-6 p-6" onClick={(e) => (e.target as HTMLElement).closest("a") && onNavigate()}>
      <Logo />
      <nav aria-label="Mobile">
        <Accordion type="single" collapsible>
          <AccordionItem value="areas">
            <AccordionTrigger className="text-base font-semibold hover:no-underline">AI Skills</AccordionTrigger>
            <AccordionContent>
              <MenuList
                items={[{ href: "/ai-areas", label: "All AI skills" }, ...data.areas.map((a) => ({ href: `/ai-areas/${a.slug}`, label: a.title }))]}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="courses">
            <AccordionTrigger className="text-base font-semibold hover:no-underline">Courses</AccordionTrigger>
            <AccordionContent>
              <MenuList
                items={[{ href: "/courses", label: "All courses" }, ...data.courses.map((c) => ({ href: `/courses/${c.slug}`, label: c.title }))]}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ul className="mt-2">
          {mainNav
            .filter((i) => !i.mega)
            .map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="block border-b py-4 text-base font-semibold">
                  {i.label}
                </Link>
              </li>
            ))}
          <li>
            <Link href="/contact" className="block border-b py-4 text-base font-semibold">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between">
          <CurrencySwitcher />
          <ThemeToggle />
        </div>
        <Button asChild variant="cta" size="xl" className="w-full">
          <Link href="/contact#book">
            <CalendarDays aria-hidden />
            Book a free discovery call
          </Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground">100% online · open to learners worldwide</p>
      </div>
    </div>
  );
}
