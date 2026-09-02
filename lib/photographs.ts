import {
  asString,
  formatSlug,
  readMdxDirectory,
  readMdxFile,
  sortByDateDesc,
} from "@/lib/mdx-file";

export type Photograph = {
  slug: string;
  date: string;
  title: string;
  image: string;
  alt: string;
  caption: string;
  content: string;
};

function toPhotograph(file: {
  slug: string;
  data: Record<string, unknown>;
  content: string;
}): Photograph | null {
  const image = asString(file.data.image);

  if (!image) {
    return null;
  }

  const caption = asString(file.data.caption);

  return {
    slug: file.slug,
    date: asString(file.data.date),
    title: asString(file.data.title, formatSlug(file.slug)),
    image,
    alt: asString(file.data.alt, caption || "Photograph"),
    caption,
    content: file.content,
  };
}

export function getPhotographs(): Photograph[] {
  return sortByDateDesc(
    readMdxDirectory("photographs")
      .map(toPhotograph)
      .filter((photo): photo is Photograph => photo !== null)
  );
}

export function getPhotograph(slug: string): Photograph | null {
  const file = readMdxFile("photographs", slug);
  return file ? toPhotograph(file) : null;
}
