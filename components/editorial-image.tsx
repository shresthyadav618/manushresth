type Size = "wide" | "intimate" | "presence" | "closing";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  size?: Size;
  priority?: boolean;
  width?: number;
  height?: number;
};

export default function EditorialImage({
  src,
  alt,
  caption,
  size = "presence",
  priority = false,
  width,
  height,
}: Props) {
  return (
    <figure className={`editorial-figure editorial-figure--${size}`}>
      {/* Native ratio: width 100%, height auto. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="editorial-image"
      />
      {caption ? (
        <figcaption className="editorial-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
