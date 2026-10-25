import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { siteConfig } from "@/content/site";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/shared/json-ld";
import { MdxContent } from "@/components/shared/mdx-content";
import { getAllPosts, getPost } from "@/lib/mdx";
import { buildMetadata, ogImageUrl } from "@/lib/seo";
import { absoluteUrl, formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    eyebrow: `Blog · ${post.category}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(ogImageUrl(post.title, `Blog · ${post.category}`)),
    keywords: post.tags.join(", "),
    articleSection: post.category,
    author: { "@type": "Person", "@id": absoluteUrl("/#daniel"), name: siteConfig.owner.name, url: absoluteUrl("/about") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <header className="relative isolate overflow-hidden border-b">
          <div aria-hidden className="bg-mesh absolute inset-0 -z-10" />
          <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
          <div className="container-page max-w-4xl pt-28 pb-12 md:pt-36 md:pb-16">
            <Breadcrumbs
              items={[
                { name: "Blog", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-brand/10 px-2.5 py-1 font-medium text-brand-text">{post.category}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock aria-hidden className="size-4" /> {post.readingTime} min read
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-bold sm:text-5xl sm:leading-[1.1]">{post.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{post.description}</p>
            <div className="mt-8 flex items-center gap-3">
              <Image
                src={siteConfig.owner.image}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full border object-cover object-top"
              />
              <div className="text-sm">
                <p className="font-semibold">{siteConfig.owner.name}</p>
                <p className="text-muted-foreground">{siteConfig.owner.jobTitle}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page max-w-3xl py-12 md:py-16">
          <MdxContent source={post.content} />
          {post.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2 border-t pt-8" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  #{t}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-12 rounded-3xl border bg-card p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold">Enjoyed this? Get the next one by email.</h2>
            <NewsletterForm className="mt-4" />
          </div>
          <Link href="/blog" className="mt-10 inline-flex items-center gap-1 text-sm font-semibold text-brand-text">
            <ArrowLeft aria-hidden className="size-4" /> All posts
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section border-t bg-surface">
          <div className="container-page">
            <h2 className="text-2xl font-bold sm:text-3xl">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
