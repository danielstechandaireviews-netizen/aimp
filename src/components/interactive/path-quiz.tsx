"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Answers = { code?: "none" | "some" | "yes"; goal?: "clients" | "job" | "product" | "own"; time?: "low" | "mid" | "high" };

const questions = [
  {
    key: "code" as const,
    q: "How comfortable are you with coding?",
    options: [
      { value: "none", label: "Never coded", hint: "No problem at all" },
      { value: "some", label: "A little", hint: "I've tried a bit" },
      { value: "yes", label: "I code", hint: "Comfortable with code" },
    ],
  },
  {
    key: "goal" as const,
    q: "What do you want AI skills to do for you?",
    options: [
      { value: "clients", label: "Win freelance clients", hint: "Sell AI services" },
      { value: "job", label: "Land an AI role", hint: "Job or contracts" },
      { value: "product", label: "Build my own product", hint: "SaaS, templates" },
      { value: "own", label: "Grow my own business", hint: "Automate my work" },
    ],
  },
  {
    key: "time" as const,
    q: "How much time can you give each week?",
    options: [
      { value: "low", label: "Under 5 hours", hint: "Learning on the side" },
      { value: "mid", label: "5–10 hours", hint: "Steady progress" },
      { value: "high", label: "10+ hours", hint: "Ready to go fast" },
    ],
  },
];

const tracks = {
  automation: {
    name: "AI Automation",
    why: "the fastest route from learning to earning — no heavy coding, and every small business has work to automate.",
    course: { slug: "ai-automation-masterclass", title: "AI Automation Masterclass" },
    area: "ai-automation",
    streams: ["Freelance automation builds", "Monthly retainers", "Automation templates"],
  },
  agents: {
    name: "AI Agents",
    why: "high-demand, high-value work: agents that book, qualify and respond for businesses around the clock.",
    course: { slug: "agentic-ai-autonomous-agents", title: "Agentic AI: Build Autonomous AI Agents" },
    area: "agentic-ai",
    streams: ["Custom agent builds", "Agent care plans", "Agent templates"],
  },
  software: {
    name: "AI Software Development",
    why: "the most flexible skill: AI apps, chatbots and your own AI products — plus strong job prospects.",
    course: { slug: "ai-software-development-bootcamp", title: "AI Software Development Bootcamp" },
    area: "ai-software-development",
    streams: ["AI app & chatbot builds", "Your own micro-SaaS", "AI developer roles"],
  },
};

function recommend(a: Required<Answers>) {
  let track: keyof typeof tracks = "automation";
  if (a.code === "yes") track = a.goal === "clients" ? "agents" : a.goal === "own" ? "automation" : "software";
  else if (a.code === "some") track = a.goal === "product" || a.goal === "job" ? "agents" : "automation";

  const format =
    a.time === "low"
      ? { label: "Self-paced course", detail: "Learn on your own schedule, a few hours a week.", href: `/courses/${tracks[track].course.slug}` }
      : a.time === "mid"
        ? { label: "Live online cohort", detail: "Weekly classes keep you accountable and moving.", href: `/courses/${tracks[track].course.slug}` }
        : { label: "12-Week Income Accelerator", detail: "1-on-1 mentorship to go from skills to income, fast.", href: "/training#mentorship" };
  return { track: tracks[track], format };
}

export function PathQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= questions.length;

  const choose = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="rounded-3xl border bg-card p-6 sm:p-10">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5" aria-hidden>
          {questions.map((q, i) => (
            <span key={q.key} className={cn("h-1.5 flex-1 rounded-full transition-colors", i < step ? "bg-brand" : "bg-muted")} />
          ))}
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">
          {done ? "Your result" : `Question ${step + 1} of ${questions.length}`}
        </span>
      </div>

      <div aria-live="polite">
        {!done ? (
          <fieldset key={step} className="animate-in fade-in slide-in-from-right-4 mt-8 duration-300">
            <legend className="font-display text-2xl font-bold sm:text-3xl">{questions[step].q}</legend>
            <div className={cn("mt-6 grid gap-3", questions[step].options.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
              {questions[step].options.map((o) => {
                const selected = answers[questions[step].key] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => choose(questions[step].key, o.value)}
                    className={cn(
                      "group rounded-2xl border bg-background/50 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand/5",
                      selected && "border-brand bg-brand/10",
                    )}
                  >
                    <span className="block font-semibold">{o.label}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{o.hint}</span>
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft aria-hidden className="size-4" /> Back
              </button>
            )}
          </fieldset>
        ) : (
          <Result result={recommend(answers as Required<Answers>)} onReset={reset} />
        )}
      </div>
    </div>
  );
}

function Result({ result, onReset }: { result: ReturnType<typeof recommend>; onReset: () => void }) {
  const { track, format } = result;
  return (
    <div className="animate-in fade-in zoom-in-95 mt-8 duration-500">
      <p className="inline-flex items-center gap-2 rounded-full bg-cta/15 px-3 py-1 text-sm font-semibold">
        <Sparkles aria-hidden className="size-4 text-cta" /> Your recommended path
      </p>
      <h3 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
        Start with <span className="text-gradient">{track.name}</span>
      </h3>
      <p className="mt-3 max-w-2xl text-muted-foreground sm:text-lg">It&apos;s {track.why}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-background/50 p-5">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">First course</p>
          <p className="mt-2 font-semibold">{track.course.title}</p>
        </div>
        <div className="rounded-2xl border bg-background/50 p-5">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Best format for you</p>
          <p className="mt-2 font-semibold">{format.label}</p>
          <p className="mt-1 text-sm text-muted-foreground">{format.detail}</p>
        </div>
        <div className="rounded-2xl border border-cta/40 bg-cta/10 p-5">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Income streams to aim for</p>
          <ul className="mt-2 space-y-1 text-sm font-medium">
            {track.streams.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="cta" size="lg">
          <Link href={format.href}>
            {format.label === "12-Week Income Accelerator" ? "See mentorship" : "View the course"} <ArrowRight aria-hidden />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact#book">Talk it through on a free call</Link>
        </Button>
        <Button variant="ghost" size="lg" onClick={onReset}>
          <RotateCcw aria-hidden /> Retake quiz
        </Button>
      </div>
    </div>
  );
}
