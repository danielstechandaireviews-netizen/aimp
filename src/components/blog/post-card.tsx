import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";
import { cn, formatDate } from "@/lib/utils";

export function PostCard({ post, className }: { post: PostMeta; className?: string }) {
  return (
    <article className={cn("card-interactive group relative flex h-full flex-col rounded-2xl border bg-card p-6", className)}>
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-full bg-brand/10 px-2.5 py-1 font-medium text-brand-text">{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="inline-flex items-center gap-1">
          <Clock aria-hidden className="size-3.5" />
          {post.readingTime} min read
        </span>
      </div>
      <h3 className="mt-4 text-xl leading-snug font-semibold">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">{post.description}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-brand-text">
        Read article <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
