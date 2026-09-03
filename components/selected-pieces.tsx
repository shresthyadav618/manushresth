import Link from "next/link";
import type { Post } from "@/lib/posts";
import { publishedLabel } from "@/lib/published";

export default function SelectedPieces({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="selected-pieces">
      {posts.map((post) => (
        <Link
          key={`${post.type}-${post.slug}`}
          href={`/${post.type}/${post.slug}`}
          className="selected-entry group"
        >
          {post.image ? (
            <div className="selected-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image.src}
                alt={post.image.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="selected-copy">
            <div className="label">{publishedLabel(post.type)}</div>
            <h3 className="display selected-title">{post.title}</h3>
            {post.description ? (
              <p className="selected-description">{post.description}</p>
            ) : null}
            <p className="arrow-link selected-arrow">Read →</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
