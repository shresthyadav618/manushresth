import Link from "next/link";
import type { ReadIf } from "@/lib/posts";
import { getPost } from "@/lib/posts";
import type { PostType } from "@/lib/posts";

function titleFromHref(href: string): string {
  const match = href.match(/^\/(writings|poems|life)\/([^/?#]+)/);

  if (!match) {
    return href;
  }

  const post = getPost(match[1] as PostType, match[2]);
  return post?.title ?? match[2];
}

function labelFromHref(href: string): string {
  if (href.startsWith("/writings/")) return "Writings";
  if (href.startsWith("/poems/")) return "Poems";
  if (href.startsWith("/life/")) return "Life";
  return "";
}

export default function ReadThisIf({ items }: { items: ReadIf[] }) {
  const recommendations = items.slice(0, 2);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <aside className="read-this-if">
      <div className="label mb-10">Read this if...</div>

      <div className="space-y-10">
        {recommendations.map((item) => (
          <Link key={item.href} href={item.href} className="group block read-if-link">
            <p className="max-w-md text-lg leading-8 text-[#85868d]">
              {item.text}
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-[#55565c]">
              {labelFromHref(item.href)}
            </p>
            <p className="arrow-link mt-3 text-base text-[#d0cdc5]">
              {titleFromHref(item.href)} →
            </p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
