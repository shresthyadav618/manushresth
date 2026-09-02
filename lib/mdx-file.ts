import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const contentDirectory = path.join(process.cwd(), "content");

export function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export type MdxFile = {
  slug: string;
  data: Record<string, unknown>;
  content: string;
};

export function readMdxFile(folder: string, slug: string): MdxFile | null {
  const filePath = path.join(contentDirectory, folder, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const text = raw.replace(/^\uFEFF/, "");
  const { data, content } = matter(text);

  return {
    slug,
    data,
    content: content.trim(),
  };
}

export function readMdxDirectory(folder: string): MdxFile[] {
  const directory = path.join(contentDirectory, folder);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readMdxFile(folder, path.basename(file, ".mdx")))
    .filter((file): file is MdxFile => file !== null);
}

export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = Date.parse(a.date);
    const dateB = Date.parse(b.date);

    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;

    return dateB - dateA;
  });
}

export function firstLine(content: string): string {
  return (
    content
      .split(/\r?\n/)
      .map((line) => line.replace(/^#+\s*/, "").trim())
      .find(Boolean) ?? ""
  );
}
