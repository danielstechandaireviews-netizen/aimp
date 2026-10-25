import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { cn } from "@/lib/utils";

/** Components available inside MDX files. Add your own here. */
const components = {
  a: ({ href = "", children, ...props }: React.ComponentProps<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="not-prose my-6 rounded-xl border border-brand/40 bg-brand/10 p-5 text-base">{children}</div>
  ),
};

export function MdxContent({ source, className }: { source: string; className?: string }) {
  return (
    <div className={cn("prose-site prose-lg", className)}>
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
      />
    </div>
  );
}
