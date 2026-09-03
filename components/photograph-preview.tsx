import Link from "next/link";
import type { Photograph } from "@/lib/photographs";

export default function PhotographPreview({
  photo,
}: {
  photo: Photograph;
}) {
  return (
    <Link
      href={`/photographs/${photo.slug}`}
      className="photograph-entry group"
    >
      <div className="photograph-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.image}
          alt={photo.alt}
          className="photograph-preview"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="photograph-entry-copy">
        <div className="label">{photo.date}</div>
        <h3 className="display photograph-entry-title">{photo.title}</h3>
        {photo.caption ? (
          <p className="photograph-entry-caption">{photo.caption}</p>
        ) : null}
        {photo.credit ? (
          <p className="photograph-entry-caption">{photo.credit}</p>
        ) : null}
      </div>
    </Link>
  );
}
