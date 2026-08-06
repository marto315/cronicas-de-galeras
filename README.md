# Crónicas de Galeras

Blog cultural del municipio de **Galeras, Sucre — Colombia**. Recoge historias, mitos y leyendas, personajes, fe y folclor de la región, con un enfoque literario y de preservación de la memoria del pueblo.

Construido con **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, con SEO completo, espacios de publicidad (Google AdSense) y un panel de administración para publicar sin tocar código (Decap CMS).

---

## Características

- **Blog con categorías**: Historia, Mitos y Leyendas, Personajes, Religión y Fe, Cultura y Folclor, Actualidad.
- **Panel de edición para clientes** (`/admin`): crea y edita crónicas, sube la imagen de portada, sin escribir código.
- **SEO**: metadata por página, Open Graph, JSON-LD (WebSite + Article), `sitemap.xml`, `robots.txt` y feed RSS en `/feed.xml`.
- **Publicidad Google AdSense**: slots configurables por variable de entorno (inicio, listado, post).
- **Diseño cálido y tradicional**: tipografía serif (Playfair Display + Lora), paleta de tonos tierra inspirada en la iglesia y el parque.
- **Imágenes de portada**: SVG ilustrativos de la iglesia y el parque de ejemplo; las portadas reales se suben desde el panel.

---

## Requisitos

- Node.js 20 o superior (recomendado: LTS 24).
- Cuenta de [Netlify](https://netlify.com) (gratis) para el panel de administración, o de [Vercel](https://vercel.com) (el panel requiere Netlify).
- Repositorio en [GitHub](https://github.com) (gratis).

## Puesta en marcha (local)

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (opcional para desarrollo)
copy .env.local.example .env.local

# 3. Levantar el servidor de desarrollo
npm run dev
```

Abre http://localhost:3000

Comandos útiles:

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción + verificación de tipos |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |

> Nota: en Windows PowerShell, si `npm` falla por política de ejecución de scripts, usa `npm.cmd`.

## Estructura del proyecto

```
app/                    # Rutas (App Router)
  page.tsx              # Inicio (hero, destacada, categorías, recientes)
  blog/page.tsx         # Listado con filtro por categoría (?categoria=)
  blog/[slug]/page.tsx  # Crónica individual (SEO + compartir + relacionadas)
  nosotros/page.tsx     # Sobre el proyecto
  sitemap.ts, robots.ts # SEO técnico
  rss/route.ts          # Feed RSS (/feed.xml)
components/             # Header, Footer, tarjetas, portadas, AdSlot
content/posts/*.md      # LAS CRÓNICAS (markdown con frontmatter)
lib/                    # Lógica: posts, categorías, configuración del sitio
public/admin/           # Panel Decap CMS (config.yml + index.html)
public/images/          # Portadas SVG de ejemplo + carpeta de subidas (uploads/)
.env.local.example      # Plantilla de variables de entorno
```

**Las crónicas viven en `content/posts/*.md`.** Cada archivo usa frontmatter YAML:

```yaml
---
title: "La Iglesia de Galeras: fe que atraviesa generaciones"
date: 2026-01-12
category: religion-y-fe       # ver lib/categories.ts para los slugs válidos
excerpt: "Resumen de 2-3 frases para buscadores y tarjetas."
cover: "/images/uploads/mi-foto.jpg"   # opcional
author: "Crónicas de Galeras"
tags: ["iglesia", "fe"]
featured: true
---
Contenido en Markdown...
```

## Panel de administración (publicar sin código)

El panel usa [Decap CMS](https://decapcms.org) y escribe las crónicas directamente en el repositorio como archivos Markdown. Para que funcione en producción:

1. Crea el repositorio en GitHub y sube este proyecto (`main`).
2. En **Netlify**: *Add new site → Import from Git* → selecciona el repo.
   - Build command: `npm run build` · Publish directory: `.next`
   - Rellena las variables de entorno (ver `.env.local.example`).
3. En el panel del sitio: **Identity → Enable**, luego **Settings → Identity → Services → Git Gateway → Enable**.
4. Invita editores en **Identity → Invite users** (por correo).
5. Entra a `https://tu-sitio.netlify.app/admin/` e inicia sesión con el correo invitado.

Cada publicación crea un commit en el repo y Netlify despliega automáticamente.

### Notas sobre el panel

- El backend configurado (`git-gateway`) requiere Netlify. Para usar GitHub OAuth directo, edita `public/admin/config.yml` (hay un bloque comentado).
- El archivo `config.yml` define las categorías y campos del formulario; la lógica del sitio vive en `lib/`.

## Publicidad (Google AdSense)

1. Activa AdSense y crea unidades "Multiplex / Display".
2. En `.env.local` (y en las variables de Netlify/Vercel):

```env
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_HOME=0000000000
NEXT_PUBLIC_ADSENSE_SLOT_LISTING=0000000000
NEXT_PUBLIC_ADSENSE_SLOT_POST_TOP=0000000000
NEXT_PUBLIC_ADSENSE_SLOT_POST_BOTTOM=0000000000
```

3. Mientras esté en `false`, los espacios se muestran como cajas de marcador ("Publicidad") para no romper el diseño.

> AdSense exige revisión y un volumen de tráfico mínimo; prepara la estructura ahora y actívala cuando tu sitio tenga contenido suficiente. Google también pide una página de privacidad si mostrarás anuncios (puedes agregar `/privacidad`).

## Despliegue

- **Netlify** (recomendado): incluye el panel de administración (Identity + Git Gateway). Build: `npm run build`, publish: `.next`.
- **Vercel**: funciona igual con el build estándar; el panel `/admin` requerirá el backend de GitHub OAuth (ver `config.yml`).

## SEO

- Titles/descriptions únicos por crónica (`generateMetadata`).
- Open Graph + Twitter Cards con la imagen de portada.
- Datos estructurados: `WebSite` (global) y `Article` (por crónica).
- `sitemap.xml`, `robots.txt` y RSS automáticos.
- URLs canónicas y `es_CO` como idioma.

## Contenido de ejemplo

Los posts en `content/posts/` son **contenido de demostración** para probar el diseño. Antes de publicar, revisa y completa con la historia real de Galeras (nombres, fechas y fuentes verificadas). Los textos incluyen notas en bloque de cita indicando que son borradores.
