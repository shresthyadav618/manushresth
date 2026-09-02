import Link from "next/link";
import type { Photograph } from "@/lib/photographs";

type Variant = "featured" | "secondary";

export default function PhotographPreview({
  photo,
  variant = "secondary",
}: {
  photo: Photograph;
  variant?: Variant;
}) {
  return (
    <Link
      href={`/photographs/${photo.slug}`}
      className={`archive-card group block photograph-entry photograph-entry--${variant}`}
    >
      <div className="photograph-feature">
        <div className="photograph-image">
          {/* Native dimensions: width 100%, height auto. Never crop or lock aspect ratio. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.image}
            alt={photo.alt}
            className="photograph-preview"
          />
        </div>

        <div className="photograph-feature-copy">
          <div className="label">{photo.date}</div>

          <h3 className="display mt-5 text-2xl sm:text-3xl">{photo.title}</h3>

          {photo.caption && (
            <p className="mt-4 text-sm leading-7 text-[#717279] sm:text-base">
              {photo.caption}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
