import { getDays } from "@/lib/days";
import { getFragments } from "@/lib/fragments";
import { getNowEntries } from "@/lib/now";
import { getPhotographs } from "@/lib/photographs";
import { getPosts } from "@/lib/posts";

export type ArchiveKind =
  | "writing"
  | "poem"
  | "life"
  | "day"
  | "photograph"
  | "now"
  | "fragment";

export type ArchiveItem = {
  kind: ArchiveKind;
  slug: string;
  date: string;
  href: string;
};

export function getArchiveItems(): ArchiveItem[] {
  const writings = getPosts("writings").map((post) => ({
    kind: "writing" as const,
    slug: post.slug,
    date: post.date,
    href: `/writings/${post.slug}`,
  }));

  const poems = getPosts("poems").map((post) => ({
    kind: "poem" as const,
    slug: post.slug,
    date: post.date,
    href: `/poems/${post.slug}`,
  }));

  const life = getPosts("life").map((post) => ({
    kind: "life" as const,
    slug: post.slug,
    date: post.date,
    href: `/life/${post.slug}`,
  }));

  const days = getDays().map((day) => ({
    kind: "day" as const,
    slug: day.slug,
    date: day.date,
    href: `/days/${day.slug}`,
  }));

  const photographs = getPhotographs().map((photo) => ({
    kind: "photograph" as const,
    slug: photo.slug,
    date: photo.date,
    href: `/photographs/${photo.slug}`,
  }));

  const now = getNowEntries().map((entry) => ({
    kind: "now" as const,
    slug: entry.slug,
    date: entry.date,
    href: `/now/${entry.slug}`,
  }));

  const fragments = getFragments().map((fragment) => ({
    kind: "fragment" as const,
    slug: fragment.slug,
    date: fragment.date,
    href: `/fragments/${fragment.slug}`,
  }));

  return [
    ...writings,
    ...poems,
    ...life,
    ...days,
    ...photographs,
    ...now,
    ...fragments,
  ];
}

export function getRandomArchiveHref(): string | null {
  const items = getArchiveItems();

  if (items.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index].href;
}
