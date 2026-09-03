import type { PostImage } from "@/lib/posts";

type Props = {
  image: PostImage;
  priority?: boolean;
};

export default function PostCover({ image, priority = false }: Props) {
  const credit = image.credit ? (
    image.source ? (
      <a
        href={image.source}
        target="_blank"
        rel="noopener noreferrer"
        className="site-link"
      >
        {image.credit} ↗
      </a>
    ) : (
      image.credit
    )
  ) : null;

  return (
    <figure className="post-cover">
      <span className="post-cover-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="post-cover-image"
        />
      </span>
      {credit ? (
        <figcaption className="post-cover-credit">{credit}</figcaption>
      ) : null}
    </figure>
  );
}
