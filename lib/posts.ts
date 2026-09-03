import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

export type PostType = "writings" | "poems" | "life";

export type PostImage = {
  src: string;
  alt: string;
  credit: string;
  source: string;
};

export type PostSource = {
  label: string;
  title: string;
  href: string;
};

export type ReadIf = {
  text: string;
  href: string;
};

export type Listening = {
  title: string;
  artist: string;
  href: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  type: PostType;
  image: PostImage | null;
  sources: PostSource[];
  readIf: ReadIf[];
  writtenWith: string;
  listening: Listening | null;
};

const contentDirectory = path.join(process.cwd(), "content");

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function parseImage(data: Record<string, unknown>): PostImage | null {
  const raw = data.image;

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const image = raw as Record<string, unknown>;
    const src = asString(image.src);

    if (!src) {
      return null;
    }

    return {
      src,
      alt: asString(image.alt),
      credit: asString(image.credit),
      source: asString(image.source),
    };
  }

  const src = asString(raw);

  if (!src) {
    return null;
  }

  return {
    src,
    alt: asString(data.imageAlt),
    credit: asString(data.imageCredit),
    source: asString(data.imageSource),
  };
}

function parseSources(data: Record<string, unknown>): PostSource[] {
  if (!Array.isArray(data.sources)) {
    return [];
  }

  return data.sources.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const source = item as Record<string, unknown>;
    const href = asString(source.href);
    const title = asString(source.title);

    if (!href || !title) {
      return [];
    }

    return [
      {
        label: asString(source.label),
        title,
        href,
      },
    ];
  });
}

function parseReadIf(data: Record<string, unknown>): ReadIf[] {
  if (!Array.isArray(data.readIf)) {
    return [];
  }

  return data.readIf
    .flatMap((item) => {
      if (!item || typeof item !== "object") {
        return [];
      }

      const entry = item as Record<string, unknown>;
      const text = asString(entry.text);
      const href = asString(entry.href) || asString(entry.slug);

      if (!text || !href) {
        return [];
      }

      return [
        {
          text,
          href: href.startsWith("/") ? href : `/${href}`,
        },
      ];
    })
    .slice(0, 2);
}

function parseWrittenWith(data: Record<string, unknown>): string {
  const raw = data.writtenWith ?? data.writtenWhile;

  if (Array.isArray(raw)) {
    return raw
      .map((item) => asString(item))
      .filter(Boolean)
      .join("\n");
  }

  return asString(raw);
}

function parseListening(data: Record<string, unknown>): Listening | null {
  const raw = data.listening;

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }

  const listening = raw as Record<string, unknown>;
  const title = asString(listening.title) || asString(listening.song);
  const artist = asString(listening.artist);
  const href = asString(listening.href);

  if (!title) {
    return null;
  }

  return { title, artist, href };
}

function parseFile(filePath: string, type: PostType): Post {
  const raw = fs.readFileSync(filePath, "utf8");
  const text = raw.replace(/^\uFEFF/, "");
  const { data, content } = matter(text);
  const slug = path.basename(filePath, ".mdx");
  const frontmatter = data as Record<string, unknown>;

  return {
    slug,
    title: asString(frontmatter.title, formatSlug(slug)),
    date: asString(frontmatter.date),
    description: asString(frontmatter.description),
    content: content.trim(),
    type,
    image: parseImage(frontmatter),
    sources: parseSources(frontmatter),
    readIf: parseReadIf(frontmatter),
    writtenWith: parseWrittenWith(frontmatter),
    listening: parseListening(frontmatter),
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
