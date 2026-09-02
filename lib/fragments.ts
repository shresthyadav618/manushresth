import { asString, readMdxDirectory, sortByDateDesc } from "@/lib/mdx-file";

export type Fragment = {
  slug: string;
  date: string;
  content: string;
};

export function getFragments(): Fragment[] {
  return sortByDateDesc(
    readMdxDirectory("fragments").map((file) => ({
      slug: file.slug,
      date: asString(file.data.date, file.slug),
      content: file.content,
    }))
  );
}
