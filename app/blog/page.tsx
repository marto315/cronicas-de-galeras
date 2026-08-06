import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { PostCard } from "@/components/post";
import { RightRailAd } from "@/components/RightRailAd";
import { CATEGORIES } from "@/lib/categories";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Crónicas",
  description: "Todas las crónicas de Galeras, Sucre: historia, mitos y leyendas, personajes, religión, cultura y actualidad.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>;
}) {
  const { categoria, q } = await searchParams;

  const posts = categoria ? await getPostsByCategory(categoria) : await getAllPosts();
  const query = (q ?? "").trim().toLowerCase();
  const filtered = query
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)),
      )
    : posts;

  const activeCategory = CATEGORIES.find((c) => c.slug === categoria);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
        <div>
          <header className="mb-8">
            <h1 className="font-display text-4xl text-umber sm:text-5xl">
              {activeCategory ? activeCategory.label : "Todas las crónicas"}
            </h1>
            <p className="mt-3 max-w-2xl text-ink/80">
              {activeCategory
                ? activeCategory.description
                : "Historias, mitos y leyendas, personajes, fe y folclor del municipio de Galeras, Sucre."}
            </p>
          </header>

          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                !categoria
                  ? "bg-clay text-cream"
                  : "border border-sand bg-cream text-ink/80 hover:border-clay"
              }`}
            >
              Todas
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  categoria === cat.slug
                    ? "bg-clay text-cream"
                    : "border border-sand bg-cream text-ink/80 hover:border-clay"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <AdSlot slotId={siteConfig.adsense.slots.listing} className="mb-10" />

          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-sand bg-cream p-10 text-center text-ink/70">
              Aún no hay crónicas en esta sección. ¡Vuelve pronto o comparte la tuya!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
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