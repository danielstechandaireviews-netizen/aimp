import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeuralPattern } from "@/components/shared/neural-pattern";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
      <div aria-hidden className="bg-mesh absolute inset-0 -z-10" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <NeuralPattern className="absolute inset-x-0 bottom-0 -z-10 mx-auto w-[720px] opacity-25" />
      <div className="container-page py-32 text-center">
        <p className="font-mono text-sm text-brand-text">404</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-6xl">This page took a wrong turn</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="cta" size="lg">
            <Link href="/">
              <ArrowLeft aria-hidden /> Back to home
            </Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link href="/courses">
              <Compass aria-hidden /> Explore courses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
