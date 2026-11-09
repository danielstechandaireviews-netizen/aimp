# Launch checklist

The site no longer shows any `[BRACKET]` placeholders. Anything that needs real information from you is hidden until you add it, so nothing here blocks going live.

## To turn on December registrations
1. In Supabase, create a project, open **SQL Editor**, and run `supabase/cohort_registrations.sql`.
2. In Vercel, add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_PASSWORD`, then redeploy.
3. See your students at `/admin/registrations`.

Until the database is connected, each registration is still emailed to `CONTACT_TO_EMAIL`, but the dashboard stays empty.

## Hidden until you add them
| What | Where | Shows up on |
| --- | --- | --- |
| Social links | `socials` in `src/content/site.ts` | Footer, About, Contact |
| Calendly | `NEXT_PUBLIC_CALENDLY_URL` | `/contact#book` (WhatsApp booking until then) |
| Selfany checkout links | `purchaseUrl` in `courses.ts`, `training.ts`, `bootcamps.ts`; `storeUrl` in `site.ts` | Enrol buttons (WhatsApp until then) |
| Certifications, media | `src/content/about.ts` | About |
| Real projects | `src/content/projects.ts`: fill in an entry, set `placeholder: false` | Home, `/projects` (course projects until then) |
| Business testimonial | `src/content/testimonials.ts`: real, consented quote only, `placeholder: false` | Services |
| Partner logos | `src/content/testimonials.ts`, files in `public/images/partners/` | Home |

## Confirm these defaults
These were filled with standard values so the site reads complete. They are promises to your customers, so change any that don't match how you work.

- **Prices:** mentorship ($350) in `training.ts`, and the service "from" prices and budget ranges in `services.ts`, are still sample prices.
- **Refunds** (`src/content/legal/refunds.mdx`, `faqs.ts`): 14 days and under 30% of a course; live cohorts 7 days before the start, then one free transfer; mentorship 24 hours' notice, unused sessions refundable for 30 days; refunds paid in 10 business days.
- **Course access:** as long as the course is offered.
- **Tax:** prices exclude tax.
- **Data retention:** enquiries and registrations 24 months, customer records 6 years.
- **Operator and law** (`terms.mdx`, `privacy.mdx`): Daniel Makonor trading as AIMoniPoint, under Nigerian law. Add a registered business name and address if you have them.

Have a qualified professional review the four files in `src/content/legal/`.

## Tagline options
The current tagline is **"Learn AI. Build with AI. Earn with AI."** (`tagline` in `src/content/site.ts`). Alternatives: "AI skills that pay — more than one way.", "Where AI skills become multiple income streams.", "Build, automate and earn with AI."
