import Link from "next/link";
import type { Post } from "@/lib/posts";

type Props = {
  post: Post;
  href: string;
  label: string;
};

export default function PostListRow({ post, href, label }: Props) {
  const columns = post.image
    ? "md:grid-cols-[minmax(240px,320px)_minmax(0,1fr)_auto]"
    : "md:grid-cols-[minmax(0,1fr)_auto]";

  return (
    <Link href={href} className="archive-card group block py-10 sm:py-14">
      <div
        className={`grid grid-cols-1 gap-7 md:items-start md:gap-12 ${columns}`}
      >
        {post.image ? (
          <div className="cover-thumb">
            <span className="cover-thumb-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image.src}
                alt={post.image.alt}
                loading="lazy"
                decoding="async"
              />
            </span>
          </div>
        ) : null}

        <div className="min-w-0 pt-0 md:pt-1">
          <span className="label">{label}</span>

          <h3 className="display mt-5 text-3xl sm:text-4xl lg:text-5xl">
            {post.title}
          </h3>

          {post.description && (
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#717279] sm:text-base">
              {post.description}
            </p>
          )}
        </div>

        <span className="card-arrow hidden self-center text-xl text-[#55565c] md:inline">
          →
        </span>
      </div>
    </Link>
  );
}
