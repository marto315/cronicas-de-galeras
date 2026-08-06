import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { Post } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export function CategoryPill({ slug }: { slug: string }) {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return (
    <Link
      href={`/categoria/${slug}`}
      className="inline-flex items-center rounded-full border border-clay/40 bg-cream/80 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-clay-dark transition hover:bg-clay hover:text-cream"
    >
      {cat?.label ?? slug}
    </Link>
  );
}

export function PostCover({
  post,
  priority = false,
  sizes = "(min-width: 768px) 33vw, 100vw",
  className = "",
}: {
  post: Pick<Post, "slug" | "title" | "cover" | "category">;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const isSvg = post.cover.toLowerCase().endsWith(".svg");

  if (isSvg) {
    return (
      <img
        src={post.cover}
        alt={post.title}
        loading={priority ? "eager" : "lazy"}
        className={`aspect-[16/9] w-full object-cover ${className}`}
      />
    );
  }

  if (post.cover) {
    return (
      <div
        className={`relative aspect-[16/9] w-full overflow-hidden ${className}`}
      >
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.slug === post.category);
  return (
    <div
      className={`flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-umber to-ink ${className}`}
    >
      <span className="px-6 text-center font-display text-2xl italic text-cream">
        {cat?.label ?? "Crónicas de Galeras"}
      </span>
    </div>
  );
}

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-cream shadow-sm transition hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="relative block overflow-hidden">
        <PostCover post={post} priority={priority} className="transition duration-300 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <CategoryPill slug={post.category} />
          <time dateTime={post.date} className="text-sm text-ink/60">
            {formatDate(post.date)}
          </time>
        </div>
        <h3 className="font-display text-xl leading-snug text-umber">
          <Link href={`/blog/${post.slug}`} className="hover:text-clay">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 flex-1 text-ink/80">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-clay transition group-hover:gap-2"
        >
          Leer crónica
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("es-CO", {
    weekday: undefined,
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function siteName() {
  return siteConfig.name;
}