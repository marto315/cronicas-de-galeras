import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import { ShareBar } from "@/components/ShareBar";

const nav: { href: string; label: string; icon: string | null }[] = [
  { href: "/", label: "Inicio", icon: siteConfig.sectionIcons.inicio },
  { href: "/blog", label: "Crónicas", icon: siteConfig.sectionIcons.blog },
  { href: "/categoria/mitos-y-leyendas", label: "Mitos y Leyendas", icon: siteConfig.sectionIcons.mitos },
  { href: "/categoria/festival", label: "Festival", icon: siteConfig.sectionIcons.festival },
  { href: "/categoria/nuestra-identidad", label: "Identidad", icon: siteConfig.sectionIcons.identidad },
  { href: "/nosotros", label: "Nosotros", icon: siteConfig.sectionIcons.nosotros },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-parchment/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/" className="group inline-flex shrink-0 items-center gap-2.5 leading-none">
          {siteConfig.sectionIcons.logo && (
            <img
              src={siteConfig.sectionIcons.logo}
              alt=""
              aria-hidden
              className="h-10 w-10 rounded-full object-cover shadow-sm transition group-hover:scale-105 sm:h-12 sm:w-12"
            />
          )}
          <span className="font-display text-2xl text-umber transition group-hover:text-clay sm:text-3xl">
            Crónicas de <span className="italic">Galeras</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium uppercase tracking-wide text-umber transition hover:bg-cream hover:text-clay sm:px-3 sm:text-sm"
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden
                  className="h-5 w-5 rounded-full object-cover"
                />
              )}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = [
    { href: "/", label: "Inicio" },
    { href: "/blog", label: "Crónicas" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/admin", label: "Panel de edición" },
    { href: "/feed.xml", label: "Suscripción RSS" },
  ];
  return (
    <footer className="border-t border-sand bg-umber/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            {siteConfig.sectionIcons.logo && (
              <img
                src={siteConfig.sectionIcons.logo}
                alt=""
                aria-hidden
                className="h-11 w-11 rounded-full object-cover shadow-sm"
              />
            )}
            <p className="font-display text-xl text-umber">
              Crónicas de <span className="italic">Galeras</span>
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Blog cultural que recoge la historia, los mitos, las leyendas y los personajes del municipio de
            Galeras, Sucre — Colombia. La memoria de un pueblo contada por su gente.
          </p>
          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-umber">Comparte la página</p>
            <ShareBar title={siteConfig.name} url={siteConfig.url} />
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-umber">Categorías</p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((cat) => {
              const catIcon = siteConfig.categoryIcons[cat.slug];
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-ink/80 transition hover:text-clay"
                  >
                    {catIcon && (
                      <img
                        src={catIcon}
                        alt=""
                        aria-hidden
                        className="h-5 w-5 rounded-full object-cover"
                      />
                    )}
                    {cat.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-umber">Enlaces</p>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink/80 transition hover:text-clay">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-sand py-5 text-center text-xs text-ink/60">
        © {year} {siteConfig.name} · Hecho con amor por y para la gente de Galeras, Sucre.
      </div>
    </footer>
  );
}
