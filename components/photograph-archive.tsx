import PhotographPreview from "@/components/photograph-preview";
import type { Photograph } from "@/lib/photographs";

export default function PhotographArchive({
  photographs,
}: {
  photographs: Photograph[];
}) {
  if (photographs.length === 0) {
    return (
      <div className="photograph-list">
        <p className="py-12 text-[#66676d]">Nothing here yet.</p>
      </div>
    );
  }

  const [featured, ...rest] = photographs;

  return (
    <div className="photograph-list">
      <PhotographPreview photo={featured} variant="featured" />

      {rest.map((photo) => (
        <PhotographPreview
          key={photo.slug}
          photo={photo}
          variant="secondary"
        />
      ))}
    </div>
  );
}
