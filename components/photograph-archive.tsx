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
        <p className="empty-note">Nothing here yet.</p>
      </div>
    );
  }

  return (
    <div className="photograph-list">
      {photographs.map((photo) => (
        <PhotographPreview key={photo.slug} photo={photo} />
      ))}
    </div>
  );
}
