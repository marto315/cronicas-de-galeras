<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Crónicas de Galeras — developer guide

Blog cultural (Next.js 16 App Router + TypeScript + Tailwind v4) para Galeras, Sucre, Colombia.

## Commands

Run these via `npm.cmd` if plain `npm` fails on this Windows PowerShell (script-execution policy blocks `npm.ps1`).

- `npm run dev` — dev server
- `npm run build` — production build + typecheck (final verification gate)
- `npm run lint` — ESLint
- `npm run start` — serve production build

## Content is files, not a database

- Posts live in `content/posts/*.md` (markdown + YAML frontmatter). This is the single source of truth; the site reads it at build/server time from `lib/posts.ts`.
- Frontmatter fields: `title`, `date`, `category`, `excerpt`, `cover`, `author`, `tags`, `featured`, `body`.
- Valid category slugs are defined in `lib/categories.ts` (`historia`, `mitos-y-leyendas`, `personajes`, `religion-y-fe`, `cultura-y-folclor`, `festival`, `nuestra-identidad`, `actualidad`). An invalid category falls back to `actualidad`.
- Each category has a landing page at `/categoria/[slug]` (SSG via `generateStaticParams` + `dynamicParams: false`). Main menu sections (Mitos y Leyendas, Festival, Identidad) point there; "Crónicas" (`/blog`) is the single section that lists every post, including Personajes content.
- **Gotcha:** gray-matter/YAML parses `date: 2026-01-12` into a JS `Date` object. Always normalize dates to `YYYY-MM-DD` strings (see `normalizeDate` in `lib/posts.ts`) before string interpolation — `new Date(\`${date}T00:00:00\`)` throws `RangeError: Invalid time value` otherwise.
- Uploaded cover images from the admin go to `public/images/uploads/` and are referenced as `/images/uploads/...`.
- **Do not `npm install` new markdown/render deps lightly** — `gray-matter` + `remark` + `remark-html` are the pipeline.

## Next.js 16 conventions to respect

- `params` and `searchParams` are **Promises** — `await` them in pages/layouts (`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`).
- Post pages are SSG via `generateStaticParams` + `generateMetadata` (SEO metadata per post). `/blog` is dynamic (reads `searchParams` for `?categoria=`).
- RSS is served at `/feed.xml` via a rewrite in `next.config.ts` (the route handler itself is `app/rss/route.ts` → `/rss`).
- SEO files: `app/sitemap.ts`, `app/robots.ts`, JSON-LD `Article`/`WebSite` injected inline.
- SVG covers must use plain `<img>` (next/image rejects SVG without `dangerouslyAllowSVG`). Raster covers use next/image.

## AdSense

Enabled only when `NEXT_PUBLIC_ADSENSE_ENABLED=true` (env vars in `.env.local.example`). When off, `<AdSlot>` renders a placeholder box so layout doesn't break. Client ID and slot IDs come from `NEXT_PUBLIC_ADSENSE_*`. All config read through `lib/site.ts`.

## Admin (Decap CMS)

- Static files only: `public/admin/index.html` + `public/admin/config.yml`. No build dependency.
- Backend is `git-gateway` (requires Netlify Identity + Git Gateway). GitHub OAuth backend is documented as a commented block in `config.yml`.
- `config.yml` must stay in sync with the frontmatter fields in `lib/posts.ts`.

## Verify

After any change: `npm run lint` then `npm run build`. Build must end with all routes prerendered (posts appear in the SSG list) — an empty post list means content reads are broken.
