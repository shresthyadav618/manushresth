import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import { getPost, getPosts } from "@/lib/posts";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPosts("writings").map((post) => ({
    slug: post.slug,
  }));
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost("writings", slug);

  if (!post) notFound();

  const paragraphs = post.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-[#eeeae1]">
      <SiteHeader />

      <article className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">

        <Link
          href="/#writings"
          className="site-link text-xs text-[#66676d]"
        >
          ← Back to writings
        </Link>

        <header className="mt-24 max-w-4xl sm:mt-32">

          <div className="label mb-8">
            Writing
          </div>

          <h1 className="display-tight text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9]">
            {post.title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-[#66676d]">
            <span>{post.date}</span>
            <span>·</span>
            <span>Manushresth</span>
          </div>

          {post.description && (
            <p className="mt-10 max-w-2xl text-lg leading-8 text-[#85868d] sm:text-xl">
              {post.description}
            </p>
          )}

        </header>

        <div className="article-text mt-20 max-w-2xl sm:mt-28">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-24 border-t border-[#25262a] pt-8">
          <Link
            href="/#writings"
            className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
          >
            ← More writings
          </Link>
        </div>

      </article>
    </main>
  );
}