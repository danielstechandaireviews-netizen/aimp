import { notFound } from "next/navigation";
import { MdxContent } from "@/components/shared/mdx-content";
import { PageHero } from "@/components/shared/page-hero";
import { getLegalDoc, legalSlugs } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return buildMetadata({ title: doc.title, description: doc.description, path: `/legal/${slug}`, eyebrow: "Legal" });
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        description={doc.updated ? `Last updated: ${doc.updated}` : undefined}
        breadcrumbs={[{ name: doc.title, path: `/legal/${slug}` }]}
      />
      <div className="container-page max-w-3xl py-12 md:py-16">
        <MdxContent source={doc.content} className="prose-base md:prose-lg" />
      </div>
    </>
  );
}
