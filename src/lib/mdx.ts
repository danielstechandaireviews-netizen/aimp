import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const COURSE_DIR = path.join(process.cwd(), "src", "content", "courses");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number; // minutes
  image?: string;
}

export interface Post extends PostMeta {
  content: string;
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");
  if (!data.title || !data.date) {
    throw new Error(`Blog post "${file}" is missing a title or date in its frontmatter.`);
  }
  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    category: String(data.category ?? "General"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: data.image ? String(data.image) : undefined,
    readingTime: readingTime(content),
    content,
  };
}

/** All posts, newest first. Files whose name starts with "_" are drafts. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = readPost(f);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  const file = [`${slug}.mdx`, `${slug}.md`].find((f) => fs.existsSync(path.join(BLOG_DIR, f)));
  return file ? readPost(file) : undefined;
}

export function getCategories() {
  return Array.from(new Set(getAllPosts().map((p) => p.category))).sort();
}

/** Optional long-form "About this course" MDX at src/content/courses/<slug>.mdx */
export function getCourseContent(slug: string): string | undefined {
  const file = path.join(COURSE_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  return matter(fs.readFileSync(file, "utf8")).content;
}

const LEGAL_DIR = path.join(process.cwd(), "src", "content", "legal");
export const legalSlugs = ["privacy", "terms", "refunds", "cookies"] as const;

/** Legal pages live in src/content/legal/<slug>.mdx */
export function getLegalDoc(slug: string) {
  const file = path.join(LEGAL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    updated: String(data.updated ?? ""),
    content,
  };
}
