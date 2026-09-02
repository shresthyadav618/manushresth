import { asString, firstLine, readMdxDirectory, readMdxFile, sortByDateDesc } from "@/lib/mdx-file";

export type Day = {
  slug: string;
  date: string;
  content: string;
};

function toDay(file: { slug: string; data: Record<string, unknown>; content: string }): Day {
  return {
    slug: file.slug,
    date: asString(file.data.date, file.slug),
    content: file.content,
  };
}

export function getDays(): Day[] {
  return sortByDateDesc(readMdxDirectory("days").map(toDay));
}

export function getDay(slug: string): Day | null {
  const file = readMdxFile("days", slug);
  return file ? toDay(file) : null;
}

export function dayPreview(day: Day): string {
  return firstLine(day.content);
}
