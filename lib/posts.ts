import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

export type PostType = "writings" | "poems" | "life";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  type: PostType;
};

const contentDirectory = path.join(process.cwd(), "content");

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function parseFile(filePath: string, type: PostType): Post {
  const raw = fs.readFileSync(filePath, "utf8");
  const text = raw.replace(/^\uFEFF/, "");
  const { data, content } = matter(text);
  const slug = path.basename(filePath, ".mdx");

  return {
    slug,
    title: asString(data.title, formatSlug(slug)),
    date: asString(data.date),
    description: asString(data.description),
    content: content.trim(),
    type,
  };
}

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getPosts(type: PostType): Post[] {
  const directory = path.join(contentDirectory, type);

  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) =>
    parseFile(path.join(directory, file), type)
  );

  return posts.sort((a, b) => {
    const dateA = Date.parse(a.date);
    const dateB = Date.parse(b.date);

    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;

    return dateB - dateA;
  });
}

export function getPost(type: PostType, slug: string): Post | null {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseFile(filePath, type);
}

export function postMetadata(post: Post): Metadata {
  return {
    title: post.title,
    description: post.description || undefined,
  };
}
