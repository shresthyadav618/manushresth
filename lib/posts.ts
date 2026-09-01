import fs from "fs";
import path from "path";

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

function parseFile(
  filePath: string,
  type: PostType
): Post {
  const raw = fs.readFileSync(filePath, "utf8");

  // Remove Windows BOM if present
  const text = raw.replace(/^\uFEFF/, "");

  // Find frontmatter
  const frontmatterMatch = text.match(
    /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/
  );

  let frontmatter = "";
  let content = "";

  if (frontmatterMatch) {
    frontmatter = frontmatterMatch[1];
    content = frontmatterMatch[2].trim();
  } else {
    content = text.trim();
  }

  const data: Record<string, string> = {};

  frontmatter.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([^:]+):\s*["']?(.*?)["']?\s*$/);

    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();

      data[key] = value;
    }
  });

  const slug = path.basename(filePath, ".mdx");

  return {
    slug,

    title:
      data.title ||
      formatSlug(slug),

    date:
      data.date || "",

    description:
      data.description || "",

    content,

    type,
  };
}

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

export function getPosts(
  type: PostType
): Post[] {
  const directory = path.join(
    contentDirectory,
    type
  );

  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) =>
    parseFile(
      path.join(directory, file),
      type
    )
  );

  return posts.sort((a, b) => {
    const dateA = Date.parse(a.date);
    const dateB = Date.parse(b.date);

    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;

    return dateB - dateA;
  });
}

export function getPost(
  type: PostType,
  slug: string
): Post | null {
  const filePath = path.join(
    contentDirectory,
    type,
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseFile(filePath, type);
}