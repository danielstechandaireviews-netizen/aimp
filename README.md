# AIMoniPoint.com

The website of **Daniel Makonor**, an AI educator, software engineer and data engineer. AIMoniPoint trains individuals in AI hard skills (AI Software Development, AI Automation and AI Agents) so they can build **multiple streams of income**. It also delivers those same three services to **small and medium businesses**. Everything is online and open worldwide.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · Motion (Framer Motion) · MDX · Resend**. Deploys to **Vercel**.

> Before launch, work through **[PLACEHOLDERS.md](./PLACEHOLDERS.md)**. It lists every value you need to replace.

---

## 1. Quick start

Requirements: **Node.js 20.9+** (developed on Node 24) and npm.

```bash
npm install
cp .env.example .env.local      # then fill in values (see section 2)
npm run dev                     # http://localhost:3000
```

Other scripts:

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Local development server with hot reload      |
| `npm run build` | Production build (also type-checks)           |
| `npm run start` | Run the production build locally              |
| `npm run lint`  | ESLint                                        |

In development, when Resend is **not** configured, form submissions are printed to the terminal instead of being emailed, so you can test the forms without any keys. In production, a missing key returns a friendly error to the visitor.

---

## 2. Environment variables

Every variable is documented in [`.env.example`](./.env.example). Put them in `.env.local` locally, and in **Vercel → Project → Settings → Environment Variables** for production. Never commit real keys.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://aimonipoint.com`. Used for canonical URLs, sitemap and OG images |
| `NEXT_PUBLIC_CONTACT_EMAIL` | ✅ | Public email shown on the site |
| `NEXT_PUBLIC_CALENDLY_URL` | ✅ | Your Calendly event link (replaces `[CALENDLY_URL]`) |
| `RESEND_API_KEY` | ✅ | Resend API key, for the contact, enquiry and lead-magnet emails |
| `RESEND_FROM_EMAIL` | ✅ | Sender on a **verified** Resend domain, e.g. `AIMoniPoint <hello@aimonipoint.com>` |
| `CONTACT_TO_EMAIL` | ✅ | Inbox that receives form submissions |
| `NEWSLETTER_PROVIDER` | – | `convertkit`, `mailchimp` or `none` (default: sign-ups are emailed to you) |
| `CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID` | – | Needed if the provider is `convertkit` (Kit API v4) |
| `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID` | – | Needed if the provider is `mailchimp` (uses double opt-in) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` **or** `NEXT_PUBLIC_GA_ID` | – | Analytics. Loads **only after cookie consent** |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | – | Floating WhatsApp button, digits only (e.g. `15551234567`). Leave empty to hide it |

**Setting up Resend:** create an account → add and verify the `aimonipoint.com` domain (add the DNS records it gives you) → create an API key → set the three Resend/contact variables above.

---

## 3. Editing content

**All content lives in `src/content/`.** You never need to touch components to change text, prices or lists. Every data file is typed, so mistakes show up in your editor and in `npm run build`.

```
src/content/
├── site.ts           Site name, tagline, mission, contact, socials, regions (served / growing), nav, feature flags
├── about.ts          Bio, stats bar, career timeline, industries, skills, philosophy, certifications, media
├── areas.ts          AI skills (3 money-making tracks + supporting skills) → /ai-areas/[slug]
├── income.ts         Income streams, income-calculator example values, Learn → Build → Earn steps
├── courses.ts        Courses (curriculum, prices, Selfany links, FAQs) → /courses/[slug]
├── courses/*.mdx     Optional long-form "About this course" copy, one file per course slug
├── training.ts       Training offerings, pricing tiers, "How it works" steps
├── services.ts       The 3 SMB services ("from" prices, examples, linked course), enquiry budgets
├── projects.ts       Projects & student builds → /projects/[slug]
├── testimonials.ts   Testimonials + communities/partners logo strip
├── faqs.ts           FAQ groups (/faq, plus a home-page preview)
├── blog/*.mdx        Blog posts → /blog/[slug]
└── legal/*.mdx       Privacy, Terms, Refunds, Cookies → /legal/[slug]
```

### Add or edit a course
1. Open `src/content/courses.ts` and copy an existing course object.
2. Give it a unique `slug` (this becomes the URL `/courses/<slug>`).
3. Set `area` to one of the slugs in `areas.ts` (e.g. `"agentic-ai"`).
4. Fill in `price` for **all four currencies** (see section 4).
5. Set `purchaseUrl` to the Selfany checkout link for **that** course. Until it's set, the "Enrol now" button stays disabled with a note.
6. Leave `rating: null` until you have genuine reviews, then use `{ value: 4.9, count: 37 }`.
7. `featured: true` puts the course in the home-page carousel.
8. *(Optional)* create `src/content/courses/<slug>.mdx` for long-form copy. It appears under the course description.

The course also appears automatically in the catalogue, filters, mega-menu, related-course lists, sitemap and JSON-LD.

### Add or edit a service, training package or AI area
Edit `services.ts`, `training.ts` or `areas.ts` in the same way. In `areas.ts`, `relatedCourses` and `relatedServices` reference slugs from the other files. For training tiers, set `price: null` to show "Custom quote".

### Replace a placeholder project
In `projects.ts`, set `kind` ("Client project" or "Student build"), `service` and `sector`, fill in the other fields, add images to `public/images/projects/`, then set **`placeholder: false`**. Placeholder projects are labelled on the site, set to `noindex` and left out of the sitemap until you do this.

### Edit income streams and the calculator
`income.ts` holds the six income streams and the calculator's starting values per currency. The calculator always states that results are illustrative and not an earnings promise. Keep it that way, and avoid publishing income figures you can't substantiate.

### Add testimonials and partner logos
In `testimonials.ts`, replace a placeholder with a **real, consented** quote and set `placeholder: false`. For partner logos, put the file in `public/images/partners/`, then set `logo`, `name`, `url` and `placeholder: false`. Only show organisations that have given permission.

### Write a blog post
Create `src/content/blog/my-post-slug.mdx`:

```mdx
---
title: "Your post title"
description: "One-sentence summary used on cards and in search results."
date: "2026-11-01"
category: "AI Automation"
tags: ["n8n", "Automation"]
---

Your content in **Markdown**. Internal links like [courses](/courses) use client-side navigation.

<Callout>Highlighted tip box.</Callout>
```

Reading time, the category filter, the OG image, the `BlogPosting` JSON-LD and the sitemap entry are all generated automatically. Prefix a filename with `_` (e.g. `_draft.mdx`) to keep it unpublished.

### Your photo
Replace `public/images/daniel-makonor.jpg` with your portrait, keeping the same filename. A portrait (about 4:5) on a dark background works best. The framing fades the bottom of the image into the page.

---

## 4. Prices and currencies

Each price is stored **per currency**. There's no live conversion, so you control every number:

```ts
price: { CAD: 899, USD: 649, GBP: 519, EUR: 599 },
compareAtPrice: { CAD: 1099, USD: 799, GBP: 639, EUR: 739 }, // optional "was" price
```

- Visitors switch currency with the CAD / USD / GBP / EUR switcher. Their choice is remembered.
- The default currency is `defaultCurrency` in `src/content/site.ts`.
- Course JSON-LD publishes an `Offer` for each currency.

> The prices in the repo are **sample prices**. Replace them all.

---

## 5. Deploying to Vercel and connecting AIMoniPoint.com

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In Vercel, click **Add New → Project**, import the repo, and keep the defaults (Framework: Next.js).
3. Add the environment variables from section 2 (Production and Preview).
4. Click **Deploy**.
5. **Connect the domain:** Project → **Settings → Domains** → add `aimonipoint.com` and `www.aimonipoint.com`. Vercel shows the DNS records to create at your registrar:
   - Apex `aimonipoint.com` → **A** record to the IP Vercel shows (or use Vercel nameservers)
   - `www` → **CNAME** to the target Vercel shows (e.g. `cname.vercel-dns.com`)
   - Choose one as primary. Vercel redirects the other automatically.
6. Make sure `NEXT_PUBLIC_SITE_URL=https://aimonipoint.com`, then redeploy.
7. Submit `https://aimonipoint.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

Preview deployments automatically serve a `robots.txt` that blocks indexing. Only production is indexable.

---

## 6. What's built in

**Pages:** Home · AI Skills hub + 8 skill pages · Income Streams (with calculator) · Course catalogue (search + skill/level/format filters) + 6 course pages · Mentorship & cohorts · Services for SMBs · Projects & student builds (service/type filters) · About · Blog + 3 posts · Free AI Career Roadmap (email-gated) · FAQ · Contact + Calendly · Privacy / Terms / Refunds / Cookies · 404.

**Interactive features:** A rotating hero headline, a "Find your AI income path" quiz, a Learn → Build → Earn stepper, skill-track tabs, an income-stack calculator, a learner/business audience switch, animated stats, a tools marquee, a course carousel, and a currency switcher. All of them are keyboard-accessible and respect reduced-motion settings.

**Forms:** Contact, service enquiry, training enquiry, newsletter and lead magnet. They use server actions, Zod validation, a honeypot field and accessible success/error states, and keep field values after a validation error.

**SEO:** Unique metadata and canonical URLs per page. Dynamic OG images (`/og?title=…`) for every page, including courses and posts. JSON-LD: `Person`, `Organization`, `Course` (with an offer per currency), `Service`, `FAQPage`, `BlogPosting` and `BreadcrumbList`. Also `sitemap.xml` and `robots.txt`.

**Privacy:** A cookie banner with equal-weight Accept/Reject. Analytics and the Calendly embed load only after consent (Calendly can also be loaded on click). Visitors can reopen "Cookie settings" from the footer.

**Accessibility:** Semantic landmarks, a skip link, a keyboard-operable mega-menu (Esc to close), visible focus rings, labelled form errors and `prefers-reduced-motion` support. Colour tokens are chosen for WCAG AA contrast in both themes.

**Design system:** Tokens live in `src/app/globals.css`: `brand` (growth green), `cta` (gold) and `violet` (AI accent), each defined for dark and light themes. Headings use Bricolage Grotesque and body text uses Inter. It also has the utilities `text-gradient` (green → gold), `gradient-border`, `bg-mesh`, `bg-dots`, `bg-grid` and `card-interactive`. Shared components live in `src/components/shared/`, and interactive widgets in `src/components/interactive/`.

### Performance notes
- Static generation for every page except the OG image route.
- Tailwind CSS is inlined (no render-blocking stylesheet). Fonts are self-hosted via `next/font`. Images are served as AVIF/WebP through `next/image`.
- Scroll-reveal animations use CSS scroll-driven animations (no JavaScript). The marquee and floating chips are CSS-only. Motion is lazy-loaded (`LazyMotion`) and used only for the mega-menu and cookie banner.
- Validation code (zod) runs only on the server.

---

## 7. Project structure

```
src/
├── app/                 Routes (App Router), sitemap.ts, robots.ts, og/route.tsx, icon.svg
├── components/
│   ├── ui/              shadcn/ui primitives (button, accordion, sheet, input…)
│   ├── layout/          Header + mega-menu, footer, theme toggle, cookie banner, analytics, WhatsApp
│   ├── shared/          SectionHeading, CourseCard, ServiceCard, ProjectCard, TestimonialCard,
│   │                    PricingTable, CtaBanner, FaqAccordion, CurrencySwitcher, Price, JsonLd…
│   ├── sections/        Stats bar, pillars grid, testimonials, partners strip
│   ├── interactive/     Quiz, income calculator, skill tracks, Learn→Build→Earn, audience switch, marquee…
│   ├── home/ courses/ projects/ blog/ forms/
├── content/             ← all editable content (see section 3)
├── lib/                 actions (server actions), email, newsletter, schemas, seo, mdx, currency, consent
└── assets/fonts/        Bricolage Grotesque for OG images
public/
├── images/daniel-makonor.jpg      ← replace with your photo
└── downloads/ai-career-roadmap.pdf ← replace with your real PDF
```
