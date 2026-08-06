import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { PostCard } from "@/components/post";
import { RightRailAd } from "@/components/RightRailAd";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Sección no encontrada" };
  return {
    title: cat.label,
    description: cat.description,
    alternates: { canonical: `/categoria/${cat.slug}` },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const posts = await getPostsByCategory(cat.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
        <div>
          <nav className="mb-4 text-sm text-ink/60">
            <Link href="/blog" className="hover:text-clay">
              Crónicas
            </Link>
            <span aria-hidden> / </span>
            <span className="text-umber">{cat.label}</span>
          </nav>

          <header className="mb-10 border-b border-sand pb-8">
            <h1 className="font-display text-4xl text-umber sm:text-5xl">{cat.label}</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/80">{cat.description}</p>
          </header>

          <AdSlot slotId={siteConfig.adsense.slots.listing} className="mb-10" />

          {posts.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-sand bg-cream p-10 text-center text-ink/70">
              Aún no hay crónicas en esta sección. ¡Vuelve pronto o comparte la tuya!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
        <RightRailAd />
      </div>
    </div>
  );
}
