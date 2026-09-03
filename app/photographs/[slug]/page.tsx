import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import MdxContent from "@/components/mdx-content";
import { getPhotograph, getPhotographs } from "@/lib/photographs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPhotographs().map((photo) => ({
    slug: photo.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const photo = getPhotograph(slug);

  if (!photo) return { title: "Not found" };

  return {
    title: photo.title,
    description: photo.caption || "A photograph from the archive.",
  };
}

export default async function PhotographPage({ params }: Props) {
  const { slug } = await params;
  const photo = getPhotograph(slug);

  if (!photo) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <Link href="/photographs" className="site-link text-xs text-[#66676d]">
        ← Back to photographs
      </Link>

      <div className="photograph-detail-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.image}
          alt={photo.alt}
          className="photograph-detail"
        />
      </div>

      <header className="photograph-detail-copy">
        <div className="label mb-6">Photograph</div>
        <h1 className="display photograph-detail-title">{photo.title}</h1>
        {photo.date ? (
          <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-[#55565c]">
            {photo.date}
          </p>
        ) : null}
        {photo.credit ? (
          <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-[#55565c]">
            {photo.credit}
          </p>
        ) : null}
      </header>

      {photo.caption && (
        <p className="photograph-copy mt-10 text-lg leading-8 text-[#85868d] sm:text-xl">
          {photo.caption}
        </p>
      )}

      {photo.content && (
        <div className="article-text photograph-copy mt-12">
          <MdxContent source={photo.content} />
        </div>
      )}

      <div className="mt-24 border-t border-line pt-8">
        <Link
          href="/photographs"
          className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
        >
          ← More photographs
        </Link>
      </div>
    </article>
  );
}
