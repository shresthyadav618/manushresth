import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import MdxContent from "@/components/mdx-content";
import { getNow, getNowEntries } from "@/lib/now";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getNowEntries().map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getNow(slug);

  if (!entry) return { title: "Not found" };

  return {
    title: `Now · ${entry.date}`,
    description: "A previous Now from the archive.",
  };
}

export default async function NowEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getNow(slug);

  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <Link href="/now" className="site-link text-xs text-[#66676d]">
        ← Back to now
      </Link>

      <header className="mt-24 max-w-4xl sm:mt-32">
        <div className="label mb-8">Now</div>

        <h1 className="display-tight text-[clamp(2.5rem,6vw,5rem)] leading-[0.9]">
          {entry.date}
        </h1>
      </header>

      <div className="article-text mt-16 max-w-2xl sm:mt-20">
        <MdxContent source={entry.content} />
      </div>

      <div className="mt-24 border-t border-line pt-8">
        <Link
          href="/now"
          className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
        >
          ← Now
        </Link>
      </div>
    </article>
  );
}
