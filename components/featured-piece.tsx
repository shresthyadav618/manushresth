import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatMonthYear, publishedLabel } from "@/lib/published";

type Props = {
  href: string;
  title: string;
  line: string;
  post: Post | null;
};

export default function FeaturedPiece({ href, title, line, post }: Props) {
  const image = post?.image;
  const category = post ? publishedLabel(post.type) : "Writings";
  const date = post?.date ? formatMonthYear(post.date) : "";

  return (
    <Link href={href} className="featured-piece group">
      <div className="featured-copy">
        <h2 className="display featured-title">{title}</h2>

        <p className="featured-line">{line}</p>

        <p className="featured-meta">
          {category}
          {date ? ` · ${date}` : ""}
        </p>

        <p className="arrow-link featured-read">Read →</p>
      </div>

      {image ? (
        <div className="featured-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            loading="eager"
            decoding="async"
          />
        </div>
      ) : null}
    </Link>
  );
}
