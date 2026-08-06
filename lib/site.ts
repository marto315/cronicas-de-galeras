export const siteConfig = {
  name: "Crónicas de Galeras",
  shortName: "Crónicas",
  tagline: "Historias, mitos y memoria de Galeras, Sucre — Colombia",
  description:
    "Blog cultural de Galeras, Sucre (Colombia). Historias, mitos y leyendas, personajes, fe y folclor de un pueblo lleno de memoria. Literatura y tradición oral de la región sabanera.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cronicasdegaleras.com",
  locale: "es_CO",
  author: {
    name: "Crónicas de Galeras",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cronicasdegaleras.com",
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
  },
  // Iconos por sección (imágenes en public/images/logos).
  // El logo del sitio aparece junto al nombre; cada sección usa su logo.
sectionIcons: {
    logo: "/images/logos/thumb/logo-cronicas.png",
    inicio: "/images/logos/thumb/logo-inicio.png",
    blog: "/images/logos/thumb/logo-cronicas.png",
    mitos: "/images/logos/thumb/logo-mitos-y-leyendas.png",
    festival: "/images/logos/thumb/logo-festival.png",
    identidad: "/images/logos/escudo-galeras.jpg",
    nosotros: "/images/logos/bandera-galeras.webp",
  },
  // Logo de cada categoría (para tarjetas del inicio y pie). null = sin imagen.
  categoryIcons: {
    historia: null,
    "mitos-y-leyendas": "/images/logos/thumb/logo-mitos-y-leyendas.png",
    personajes: "/images/logos/thumb/logo-personajes.png",
    "religion-y-fe": null,
    "cultura-y-folclor": "/images/logos/thumb/logo-cultura-y-folclor.png",
    festival: "/images/logos/thumb/logo-festival.png",
    "nuestra-identidad": null,
    actualidad: null,
  },
  adsense: {
    enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true",
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXXXXXXXXXXXXXX",
    slots: {
      homeTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "0000000000",
      listing: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LISTING ?? "0000000000",
      postTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_POST_TOP ?? "0000000000",
      postBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_POST_BOTTOM ?? "0000000000",
      rail: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RAIL ?? "0000000000",
    },
  },
} as const;

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
