import Link from "next/link";
import type { Metadata } from "next";
import MdxContent from "@/components/mdx-content";
import { getCurrentNow, getNowEntries } from "@/lib/now";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What I am currently reading, listening to, learning, building, and thinking about.",
};

export default function NowPage() {
  const current = getCurrentNow();
  const previous = getNowEntries().slice(1);

  return (
    <section className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <div className="label mb-8">06 / Now</div>

      <h1 className="display-tight text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9]">
        Now
      </h1>

      {current ? (
        <>
          <p className="mt-8 text-xs text-[#66676d]">{current.date}</p>

          <div className="article-text mt-16 max-w-2xl sm:mt-20">
            <MdxContent source={current.content} />
          </div>
        </>
      ) : (
        <p className="mt-16 text-[#66676d]">Nothing here yet.</p>
      )}

      {previous.length > 0 && (
        <div className="mt-24 max-w-2xl border-t border-line pt-8">
          <div className="label mb-8">Earlier</div>

          <div className="divide-y divide-line border-y border-line">
            {previous.map((entry) => (
              <Link
                key={entry.slug}
                href={`/now/${entry.slug}`}
                className="archive-card group flex items-center justify-between py-6"
              >
                <span className="text-sm text-[#85868d]">{entry.date}</span>
                <span className="card-arrow text-xl text-[#55565c]">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
