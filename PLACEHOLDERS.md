# Placeholder checklist

Everything below must be replaced or confirmed before launch. Placeholders are written in `[SQUARE BRACKETS]` so you can also search the project for `[` to find any stragglers.

Placeholder content is **clearly labelled on the live site**. Testimonials, projects, partner logos, certifications and media all show a visible "Placeholder" badge, and placeholder projects are kept out of search engines.

---

## 🔑 Environment variables (`.env.local` and Vercel)
- [ ] `NEXT_PUBLIC_SITE_URL`: `https://aimonipoint.com`
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL`: replaces `[CONTACT_EMAIL]` in the footer, contact page and form error messages
- [ ] `NEXT_PUBLIC_CALENDLY_URL`: replaces `[CALENDLY_URL]` (the booking embed on `/contact#book`)
- [ ] `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`: needed for forms to send email in production
- [ ] `NEWSLETTER_PROVIDER` and its keys (ConvertKit **or** Mailchimp), or leave it as `none`
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` **or** `NEXT_PUBLIC_GA_ID` (optional)
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional; leave empty to hide the button)

## 🖼️ Files in `/public`
- [x] `public/images/daniel-makonor.jpg`: your studio portrait ✅ added (also used in social-share images)
- [ ] `public/downloads/ai-career-roadmap.pdf`: the real AI Career Roadmap PDF (currently a one-page placeholder)
- [ ] `public/images/partners/*`: partner and community logos (see Testimonials & partners below)
- [ ] `public/images/projects/*`: case-study visuals (optional; a generated visual is used until you add them)

## ⚙️ `src/content/site.ts`
- [ ] Social links: `[LINKEDIN_URL]`, `[YOUTUBE_URL]`, `[X_URL]`, `[INSTAGRAM_URL]`, `[GITHUB_URL]`. Set a link to `""` to hide it.
- [ ] `storeUrl`: `[SELFANY_STORE_URL]` (your Selfany store home; optional)
- [ ] `defaultCurrency`: currently `USD` (sensible for a global audience across Africa, Asia and North America)
- [ ] `regionsServed` (where students have been taught so far) and `regionsGrowing` (where you're expanding). Both appear in the hero, footer, About, Services and Contact pages.
- [ ] `mission`: your mission statement (shown on Home and About)
- [ ] `features.whatsappMessage`: the pre-filled WhatsApp text
- [ ] Choose the final tagline (see the alternatives at the bottom)

## 📊 `src/content/about.ts`
- [x] Stats: 400+ students, 3 tracks, 4 communities, 5 countries
- [ ] Career timeline: add the `[Year]` for each role (Product Associate → Software Engineer → Data Engineer & Analyst → Senior Business Data Analyst → AI builder → AI Skill Educator)
- [ ] Certifications: 3 × `[Certification name]` / `[Issuer]` / `[Year]`
- [ ] Media, speaking & podcast: 3 entries (`[Podcast episode title]`, `[Talk title]`, `[Workshop title]`, and so on). Add a `url` to make an entry clickable.
- [ ] Skill tags: review the `skillGroups` list
- [ ] Confirm the bio wording. Banking, telecoms and oil & gas are presented **only as your career background**, not as AIMoniPoint projects.
- [ ] `careerIndustries`: one-line descriptions of your career industries

## 🎓 `src/content/courses.ts`
- [ ] `purchaseUrl` for each course (the "Enrol now" button stays disabled until set):
  - [ ] `[SELFANY_COURSE_URL_AI_SOFTWARE_BOOTCAMP]`
  - [ ] `[SELFANY_COURSE_URL_RAG_PRODUCTION]`
  - [ ] `[SELFANY_COURSE_URL_AUTOMATION_MASTERCLASS]`
  - [ ] `[SELFANY_COURSE_URL_N8N]`
  - [ ] `[SELFANY_COURSE_URL_AGENTIC_AI]`
  - [ ] `[SELFANY_COURSE_URL_MULTI_AGENT_MCP]`
- [ ] **Prices**: all are sample prices. Set CAD / USD / GBP / EUR for each course.
- [ ] Review the curricula, durations, formats, projects, tools and FAQs for each course
- [ ] `earnWith`: the "Ways to earn with these skills" list on each course page
- [ ] `rating`: leave `null` until you have verified reviews
- [ ] Optional long-form copy in `src/content/courses/*.mdx`

## 🧑‍🏫 `src/content/training.ts`
- [ ] Mentorship prices (Single Session, 4-Week Sprint, 12-Week Income Accelerator) are sample prices
- [ ] Community tiers show "Custom quote". Add prices if you want them public.

## 💼 `src/content/services.ts`: the three SMB services
- [ ] `startingAt` "From" prices for Rapid AI Software, AI Automation and AI Agents are **sample prices**. Set them, or use `null` for "Custom quote".
- [ ] Review the examples, deliverables and typical timelines
- [ ] `budgetRanges`: adjust to your pricing

## 💰 `src/content/income.ts`
- [ ] Review the six income streams and examples
- [ ] Calculator starting values (`defaultUnits`, `defaultPrice`, `maxPrice`) are **examples only**. Visitors change them, and the tool states it's not an earnings promise.

## 📁 `src/content/projects.ts`: all 6 projects and student builds are placeholders
For each one, set the `kind` (Client project / Student build), `service` and `sector`, replace the `[Placeholder]` title, `clientType`, `summary`, `challenge`, `solution`, `techStack`, `role` and `results`, add `images`, then set **`placeholder: false`**.
- [ ] `placeholder-website-ai-assistant`
- [ ] `placeholder-ecommerce-order-automation`
- [ ] `placeholder-booking-agent`
- [ ] `placeholder-student-invoice-automation`
- [ ] `placeholder-student-real-estate-chatbot`
- [ ] `placeholder-lead-qualification-agent`

> Tip: give the slug a real name too (e.g. `bank-policy-assistant`). The slug becomes the URL.

## 💬 `src/content/testimonials.ts`
- [ ] 6 placeholder testimonials (`[Testimonial from student — replace…]`, `[Student name]`, `[Role / company]`, `[City, Country]`). Use **real, consented** quotes only, then set `placeholder: false`.
- [ ] 6 placeholder partners and communities (`[Community 1]`, `[Partner 1]`, …): add the `logo`, `name` and `url`, then set `placeholder: false`. Only list organisations that have given permission.

## ❓ `src/content/faqs.ts`
- [ ] Course access period
- [ ] Tax policy (GST/HST, VAT, sales tax)
- [ ] Payment plans and regional pricing (for learners in Africa, Asia and elsewhere)
- [ ] Refund window for courses
- [ ] Mentorship rescheduling policy

## ⚖️ Legal pages: `src/content/legal/*.mdx`
Have these reviewed by a qualified professional, then remove the "Placeholder template" callout.
- [ ] `[LEGAL BUSINESS NAME]`, `[BUSINESS ADDRESS]`, `[CONTACT_EMAIL]`, `[EFFECTIVE DATE]` (all four files)
- [ ] Privacy: newsletter and analytics provider names, and retention periods (`[X] months`, `[X] years`)
- [ ] Terms: access period, whether taxes are included, `[JURISDICTION]`
- [ ] Refunds: every `[X] days` / `[X]%` value and the rescheduling and cohort-transfer rules. These must match your Selfany settings.
- [ ] Cookies: analytics provider name

## 🎁 Free resource page: `src/app/free-resources/page.tsx`
- [ ] Update the "What's inside" bullet list to match the final PDF, then remove the placeholder note

## 📰 Blog
- [ ] Review the 3 seed posts in `src/content/blog/`. Edit them, keep them, or delete them.

---

## Tagline options
The current tagline is **"Learn AI. Build with AI. Earn with AI."** Alternatives:
1. **"AI skills that pay — more than one way."**
2. **"Where AI skills become multiple income streams."**
3. **"Build, automate and earn with AI."** (maps to the three skill tracks)

Change it in `src/content/site.ts` (`tagline`). The home hero headline ("Learn AI skills. Build multiple streams of income.") is in `src/components/home/hero.tsx`.
