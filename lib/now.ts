import { asString, firstLine, readMdxDirectory, readMdxFile, sortByDateDesc } from "@/lib/mdx-file";

export type NowEntry = {
  slug: string;
  date: string;
  content: string;
};

function toNow(file: { slug: string; data: Record<string, unknown>; content: string }): NowEntry {
  return {
    slug: file.slug,
    date: asString(file.data.date, file.slug),
    content: file.content,
  };
}

export function getNowEntries(): NowEntry[] {
  return sortByDateDesc(readMdxDirectory("now").map(toNow));
}

export function getCurrentNow(): NowEntry | null {
  return getNowEntries()[0] ?? null;
}

export function getNow(slug: string): NowEntry | null {
  const file = readMdxFile("now", slug);
  return file ? toNow(file) : null;
}

export function nowPreview(entry: NowEntry): string {
  return firstLine(entry.content);
}
