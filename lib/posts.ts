import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { isCategorySlug, type CategorySlug } from "./categories";

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: CategorySlug;
  excerpt: string;
  cover: string;
  author: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
  html: string;
}

const postsDir = path.join(process.cwd(), "content", "posts");

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min de lectura`;
}

async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().split("T")[0];
  }
  const str = String(value ?? "").trim();
  return str.slice(0, 10) || new Date().toISOString().split("T")[0];
}

function parsePostFile(filePath: string): Omit<Post, "html"> {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, path.extname(filePath));

  return {
    slug,
    title: data.title ?? slug,
    date: normalizeDate(data.date),
    category: isCategorySlug(data.category) ? data.category : "actualidad",
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? "",
    author: data.author ?? "Crónicas de Galeras",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured),
    readingTime: readingTime(content),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(postsDir, file);
      const meta = parsePostFile(filePath);
      const html = await renderMarkdown(
        fs.readFileSync(filePath, "utf8").replace(/^---[\s\S]*?---/, ""),
      );
      return { ...meta, html };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const safe = path.basename(slug);
  const filePath = path.join(postsDir, `${safe}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const meta = parsePostFile(filePath);
  const html = await renderMarkdown(raw.replace(/^---[\s\S]*?---/, ""));
  return { ...meta, html };
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.category === category);
}

export async function getFeaturedPost(): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}
