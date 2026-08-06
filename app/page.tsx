import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { PostCard } from "@/components/post";
import { CATEGORIES } from "@/lib/categories";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const [featured, posts] = await Promise.all([getFeaturedPost(), getAllPosts()]);
  const recent = posts.filter((p) => p.slug !== featured?.slug).slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-70">
          <img
            src="/images/iglesia-galeras.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-parchment/70 via-parchment/45 to-parchment" />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="rounded-full border border-clay/30 bg-cream/80 px-4 py-1 text-xs uppercase tracking-[0.25em] text-clay-dark">
            Blog cultural · Galeras, Sucre — Colombia
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight text-umber [text-shadow:0_2px_10px_rgba(252,246,234,0.85)] sm:text-6xl">
            La memoria de Galeras, contada por su gente
          </h1>
          <p className="max-w-2xl text-lg text-ink/80 [text-shadow:0_1px_4px_rgba(252,246,234,0.9)]">
            {siteConfig.tagline}. Historias, mitos y leyendas, personajes, fe y folclor de un pueblo
            sabanero que no quiere olvidar quién es.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="rounded-full bg-clay px-7 py-3 font-semibold text-cream shadow transition hover:bg-clay-dark"
            >
              Explorar las crónicas
            </Link>
            <Link
              href="/nosotros"
              className="rounded-full border border-umber/30 bg-cream/80 px-7 py-3 font-semibold text-umber transition hover:border-clay hover:text-clay"
            >
              Conocer el proyecto
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot slotId={siteConfig.adsense.slots.homeTop} className="py-8" />
      </div>

      {featured && (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 font-display text-2xl text-umber">
            Crónica destacada
            <span className="h-px flex-1 bg-sand" aria-hidden />
          </h2>
          <article className="group grid overflow-hidden rounded-3xl border border-sand bg-cream shadow-sm md:grid-cols-2">
            <Link href={`/blog/${featured.slug}`} className="block overflow-hidden">
              <img
                src={featured.cover || "/images/cronica-de-galeras.svg"}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
              <span className="text-xs uppercase tracking-[0.2em] text-clay-dark">
                {CATEGORIES.find((c) => c.slug === featured.category)?.label}
              </span>
              <h3 className="font-display text-3xl leading-snug text-umber">
                <Link href={`/blog/${featured.slug}`} className="hover:text-clay">
                  {featured.title}
                </Link>
              </h3>
              <p className="text-ink/80">{featured.excerpt}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-1 font-semibold text-clay transition hover:gap-2"
              >
                Leer esta crónica <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="mb-6 flex items-center gap-3 font-display text-2xl text-umber">
          Categorías
          <span className="h-px flex-1 bg-sand" aria-hidden />
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const catIcon = siteConfig.categoryIcons[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-sand bg-cream p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {catIcon && (
                  <img
                    src={catIcon}
                    alt=""
                    aria-hidden
                    className="h-14 w-14 shrink-0 rounded-full border border-sand object-cover"
                  />
                )}
                <div>
                  <p className="font-display text-lg leading-tight text-umber transition group-hover:text-clay">
                    {cat.label}
                  </p>
                  <p className="mt-1 text-sm text-ink/70">{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-3 font-display text-2xl text-umber">
            Últimas crónicas
            <span className="h-px flex-1 bg-sand" aria-hidden />
          </h2>
          <Link href="/blog" className="whitespace-nowrap text-sm font-semibold text-clay hover:text-clay-dark">
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((post, i) => (
            <PostCard key={post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-sand bg-umber/5 px-8 py-12 text-center">
          <h2 className="font-display text-2xl text-umber">¿Tienes una historia de Galeras?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/80">
            Anécdotas, leyendas, recuerdos o datos históricos: queremos contarlos bien y dejarlos
            escritos para siempre. Escríbenos y hagamos crecer juntos estas crónicas.
          </p>
          <a
            href={siteConfig.social.instagram || "mailto:cronicasdegaleras@gmail.com"}
            target={siteConfig.social.instagram ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-clay px-7 py-3 font-semibold text-cream transition hover:bg-clay-dark"
          >
            Comparte tu historia
          </a>
        </div>
      </section>
    </>
  );
}
