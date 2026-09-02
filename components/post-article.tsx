import Link from "next/link";
import MdxContent from "@/components/mdx-content";
import type { Post } from "@/lib/posts";

type Props = {
  post: Post;
  label: string;
  backHref: string;
  backLabel: string;
  moreLabel: string;
  body: "mdx" | "poem";
};

export default function PostArticle({
  post,
  label,
  backHref,
  backLabel,
  moreLabel,
  body,
}: Props) {
  return (
    <article className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <Link href={backHref} className="site-link text-xs text-[#66676d]">
        ← {backLabel}
      </Link>

      <header className="mt-24 max-w-4xl sm:mt-32">
        <div className="label mb-8">{label}</div>

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

      {body === "poem" ? (
        <div className="poem-text mt-20 max-w-2xl whitespace-pre-line sm:mt-28">
          {post.content}
        </div>
      ) : (
        <div className="article-text mt-20 max-w-2xl sm:mt-28">
          <MdxContent source={post.content} />
        </div>
      )}

      <div className="mt-24 border-t border-line pt-8">
        <Link
          href={backHref}
          className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
        >
          ← {moreLabel}
        </Link>
      </div>
    </article>
  );
}
