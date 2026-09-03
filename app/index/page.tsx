import Link from "next/link";
import type { Metadata } from "next";
import {
  formatMonthYear,
  getPublishedCatalog,
  groupPublishedByYear,
  publishedHref,
  publishedLabel,
} from "@/lib/published";

export const metadata: Metadata = {
  title: "Index",
  description: "An archive of everything published here.",
};

function padCount(count: number) {
  return String(count).padStart(2, "0");
}

export default function IndexPage() {
  const { posts, counts } = getPublishedCatalog();
  const years = groupPublishedByYear(posts);

  return (
    <section className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <div className="label mb-8">Index</div>

      <h1 className="display-tight text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9]">
        Index
      </h1>

      <div className="mt-16 max-w-md border-y border-line sm:mt-20">
        {[
          { label: "Writings", count: counts.writings },
          { label: "Poems", count: counts.poems },
          { label: "Life", count: counts.life },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between border-b border-line py-5 last:border-b-0"
          >
            <span className="text-sm tracking-[0.12em] text-[#85868d] uppercase">
              {row.label}
            </span>
            <span className="text-sm tabular-nums text-[#66676d]">
              {padCount(row.count)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-24 max-w-2xl">
        {years.map(([year, entries]) => (
          <div key={year} className="mb-20 last:mb-0">
            <div className="label mb-8">{year}</div>

            <div className="divide-y divide-line border-y border-line">
              {entries.map((post) => (
                <Link
                  key={`${post.type}-${post.slug}`}
                  href={publishedHref(post)}
                  className="archive-card group block py-8"
                >
                  <h2 className="display text-2xl sm:text-3xl">{post.title}</h2>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-[#55565c]">
                    {publishedLabel(post.type)} · {formatMonthYear(post.date)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="py-12 text-[#66676d]">Nothing here yet.</p>
        )}
      </div>
    </section>
  );
}
