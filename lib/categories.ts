export const CATEGORIES = [
  {
    slug: "historia",
    label: "Historia",
    description: "Orígenes, fundación y evolución del pueblo de Galeras.",
  },
  {
    slug: "mitos-y-leyendas",
    label: "Mitos y Leyendas",
    description: "Relatos de la tradición oral que se cuentan en las noches sabaneras.",
  },
  {
    slug: "personajes",
    label: "Personajes",
    description: "Hombres y mujeres que aportaron al crecimiento del municipio.",
  },
  {
    slug: "religion-y-fe",
    label: "Religión y Fe",
    description: "La iglesia, sus patronas, fiestas y devociones del pueblo.",
  },
  {
    slug: "cultura-y-folclor",
    label: "Cultura y Folclor",
    description: "Música, danza, gastronomía, cumbia y tradiciones de la región.",
  },
  {
    slug: "festival",
    label: "Festival",
    description: "Festivales, fiestas y celebraciones que llenan de color a Galeras.",
  },
  {
    slug: "nuestra-identidad",
    label: "Identidad",
    description: "Lo que somos: símbolos, memoria, territorio y sentido de pertenencia.",
  },
  {
    slug: "actualidad",
    label: "Actualidad",
    description: "Noticias, agenda y vida del municipio.",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORIES.some((c) => c.slug === slug);
}