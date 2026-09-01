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
  return getPosts("poems").map((post) => ({
    slug: post.slug,
  }));
}

export default async function PoemPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost("poems", slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-[#eeeae1]">
      <SiteHeader />

      <article className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">

        <Link
          href="/#poems"
          className="site-link text-xs text-[#66676d]"
        >
          ← Back to poems
        </Link>

        <header className="mt-24 max-w-4xl sm:mt-32">

          <div className="label mb-8">
            Poem
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

        <div className="poem-text mt-20 max-w-2xl whitespace-pre-line sm:mt-28">
          {post.content}
        </div>

        <div className="mt-24 border-t border-[#25262a] pt-8">
          <Link
            href="/#poems"
            className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
          >
            ← More poems
          </Link>
        </div>

      </article>
    </main>
  );
}