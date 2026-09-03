import { sortByDateDesc } from "@/lib/mdx-file";
import { getPost, getPosts, type Post, type PostType } from "@/lib/posts";

export function getPublishedCatalog() {
  const writings = getPosts("writings");
  const poems = getPosts("poems");
  const life = getPosts("life");
  const posts = sortByDateDesc([...writings, ...poems, ...life]);

  return {
    writings,
    poems,
    life,
    posts,
    counts: {
      writings: writings.length,
      poems: poems.length,
      life: life.length,
    },
  };
}

export function getPublishedPosts(): Post[] {
  return getPublishedCatalog().posts;
}

export function getPublishedCounts() {
  return getPublishedCatalog().counts;
}

export function getPublishedHrefs(): string[] {
  return getPublishedPosts().map(publishedHref);
}

export function publishedHref(post: Post): string {
  return `/${post.type}/${post.slug}`;
}

export function getPostByHref(href: string): Post | null {
  const match = href.match(/^\/(writings|poems|life)\/([^/?#]+)/);

  if (!match) {
    return null;
  }

  return getPost(match[1] as PostType, match[2]);
}

export function publishedLabel(type: PostType): string {
  if (type === "writings") return "Writings";
  if (type === "poems") return "Poems";
  return "Life";
}

export function getRandomPublishedHref(): string | null {
  const posts = getPublishedPosts();

  if (posts.length === 0) {
    return null;
  }

  const post = posts[Math.floor(Math.random() * posts.length)];
  return publishedHref(post);
}

export function formatMonthYear(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})/);

  if (match) {
    const month = Number(match[2]);

    if (month >= 1 && month <= 12) {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(Date.UTC(Number(match[1]), month - 1, 1)));
    }

    return match[1];
  }

  const parsed = Date.parse(date);

  if (!isNaN(parsed)) {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(parsed));
  }

  return date;
}

export function yearFromDate(date: string): string {
  const match = date.match(/^(\d{4})/);
  return match ? match[1] : "Undated";
}

export function groupPublishedByYear(posts: Post[]) {
  const groups = new Map<string, Post[]>();

  for (const post of posts) {
    const year = yearFromDate(post.date);
    const list = groups.get(year) ?? [];
    list.push(post);
    groups.set(year, list);
  }

  return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}
