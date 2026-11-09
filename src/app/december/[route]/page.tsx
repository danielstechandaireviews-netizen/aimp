import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, Globe2 } from "lucide-react";
import { bootcamp, currentCohort, getBootcampRoute, registrationPath } from "@/content/bootcamps";
import { getCourse } from "@/content/courses";
import { Countdown } from "@/components/december/countdown";
import { RegistrationForm } from "@/components/forms/registration-form";
import { buildMetadata } from "@/lib/seo";
import { sourceFrom } from "../source";

const price = `$${bootcamp.price.USD} USD`;

export async function generateMetadata({ params }: PageProps<"/december/[route]">) {
  const b = getBootcampRoute((await params).route);
  if (!b) return {};
  return buildMetadata({
    title: `Register: ${b.track} bootcamp, ${currentCohort.month}`,
    description: `${b.pitch} Live online, ${currentCohort.dates}. ${price}.`,
    path: registrationPath(b.route),
    image: `/flyer/december?route=${b.route}&format=landscape`,
  });
}

export default async function RegisterPage({ params, searchParams }: PageProps<"/december/[route]">) {
  const b = getBootcampRoute((await params).route);
  const course = b && getCourse(b.slug);
  if (!b || !course) notFound();
  const source = sourceFrom((await searchParams).ref);

  return (
    <section className="relative border-b bg-mesh">
      <div className="container-page grid gap-12 pt-28 pb-14 md:pt-36 md:pb-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Link href={currentCohort.path} className="inline-flex items-center gap-1 text-sm font-medium text-brand-text">
            <ArrowLeft aria-hidden className="size-4" /> All routes
          </Link>
          <p className="mt-6 text-xs font-semibold tracking-widest text-cta uppercase">
            {b.track} bootcamp · {currentCohort.title}
          </p>
          <h1 className="mt-4 text-5xl leading-[1.04] font-extrabold sm:text-6xl">
            {b.headline[0]} <span className="text-gradient">{b.headline.slice(1).join(" ")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{b.pitch}</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-semibold">
            <li className="flex items-center gap-2">
              <CalendarDays aria-hidden className="size-5 text-brand-text" /> {currentCohort.dates}
            </li>
            <li className="flex items-center gap-2">
              <Globe2 aria-hidden className="size-5 text-brand-text" /> Live online
            </li>
            <li>{price}</li>
          </ul>
          <div className="mt-8">
            <Countdown />
          </div>
          <h2 className="mt-10 text-xl font-bold">What you&apos;ll build</h2>
          <ul className="mt-4 space-y-4">
            {course.projects.map((p) => (
              <li key={p.title} className="flex gap-3">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-text" />
                <span>
                  <strong className="font-semibold">{p.title}.</strong> <span className="text-muted-foreground">{p.description}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href={`/courses/${course.slug}`} className="mt-6 inline-block text-sm font-medium text-brand-text underline-offset-4 hover:underline">
            See the full curriculum
          </Link>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-3xl border bg-card p-6 glow-ring sm:p-8 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold">Register your seat</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">Takes one minute. You pay after Daniel confirms the details with you.</p>
            <RegistrationForm route={b.route} source={source} />
          </div>
        </div>
      </div>
    </section>
  );
}
