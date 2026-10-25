import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { BlogList } from "@/components/blog/blog-list";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/shared/page-hero";
import { getAllPosts, getCategories } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog & Resources — Practical AI Guides",
  description:
    "Practical guides on AI Software Development, AI Automation, Agentic AI, MCP and AI careers from Daniel Makonor.",
  path: "/blog",
  eyebrow: "Blog & resources",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const cards = Object.fromEntries(posts.map((p) => [p.slug, <PostCard key={p.slug} post={p} />]));

  return (
    <>
      <PageHero
        eyebrow="Blog & resources"
        title={
          <>
            Practical AI, <span className="text-gradient">explained clearly</span>
          </>
        }
        description="Guides, tutorials and career advice on building and earning with AI."
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
      />

      <section className="section container-page">
        {posts.length ? (
          <BlogList posts={posts.map((p) => ({ slug: p.slug, category: p.category }))} cards={cards} categories={getCategories()} />
        ) : (
          <p className="text-muted-foreground">No posts yet — check back soon.</p>
        )}
      </section>

      <section className="container-page pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-between rounded-3xl border bg-card p-8">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brand-text uppercase">Free resource</p>
              <h2 className="mt-2 text-2xl font-bold">{siteConfig.leadMagnet.title}</h2>
              <p className="mt-3 text-muted-foreground">{siteConfig.leadMagnet.description}</p>
            </div>
            <Button asChild variant="cta" size="lg" className="mt-6 self-start">
              <Link href="/free-resources">
                <Download aria-hidden /> Get the free roadmap <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="rounded-3xl border bg-card p-8">
            <h2 className="text-2xl font-bold">Get new posts by email</h2>
            <p className="mt-3 mb-6 text-muted-foreground">One practical AI email, roughly every two weeks.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
