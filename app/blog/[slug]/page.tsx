import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { CategoryPill, PostCard, formatDate } from "@/components/post";
import { RightRailAd } from "@/components/RightRailAd";
import { ShareBar } from "@/components/ShareBar";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { siteConfig, absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Crónica no encontrada" };

  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = post.cover
    ? absoluteUrl(post.cover)
    : absoluteUrl("/images/cronica-de-galeras.svg");

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: new Date(`${post.date}T00:00:00`).toISOString(),
      authors: [post.author],
      tags: post.tags,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const related = await getRelatedPosts(post);
  const index = all.findIndex((p) => p.slug === post.slug);
  const prev = all[index + 1] ?? null;
  const next = all[index - 1] ?? null;

  const shareUrl = absoluteUrl(`/blog/${post.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(`${post.date}T00:00:00`).toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: shareUrl,
    image: post.cover
      ? absoluteUrl(post.cover)
      : absoluteUrl("/images/cronica-de-galeras.svg"),
  };

  return (
    <>
      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
          <div>
            <header className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <CategoryPill slug={post.category} />
          </div>
          <h1 className="font-display text-4xl leading-tight text-umber sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-ink/60">
            <span>Por {post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {post.cover && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-sand">
            <img
              src={post.cover}
              alt={post.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <AdSlot slotId={siteConfig.adsense.slots.postTop} className="mb-10" />

        <div
          className="prose-cronicas"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <AdSlot slotId={siteConfig.adsense.slots.postBottom} className="mt-10" />

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-sand bg-cream px-3 py-1 text-xs text-ink/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-sand bg-cream p-5">
          <span className="text-sm font-semibold uppercase tracking-wide text-umber">
            Comparte esta crónica
          </span>
          <ShareBar title={post.title} url={shareUrl} />
        </div>

        {(prev || next) && (
          <nav className="mt-10 grid gap-4 sm:grid-cols-2">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-2xl border border-sand bg-cream p-5 transition hover:shadow"
              >
                <span className="text-xs uppercase tracking-wide text-ink/50">Anterior</span>
                <p className="mt-1 font-display text-lg text-umber group-hover:text-clay">
                  {prev.title}
                </p>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-2xl border border-sand bg-cream p-5 text-right transition hover:shadow"
              >
                <span className="text-xs uppercase tracking-wide text-ink/50">Siguiente</span>
                <p className="mt-1 font-display text-lg text-umber group-hover:text-clay">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        )}
          </div>
          <RightRailAd />
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 font-display text-2xl text-umber">
            Relacionadas
            <span className="h-px flex-1 bg-sand" aria-hidden />
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
