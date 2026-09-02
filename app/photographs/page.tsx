import type { Metadata } from "next";
import PhotographArchive from "@/components/photograph-archive";
import { getPhotographs } from "@/lib/photographs";

export const metadata: Metadata = {
  title: "Photographs",
  description: "Things noticed. Kept here.",
};

export default function PhotographsPage() {
  const photographs = getPhotographs();

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-10">
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
        <div className="label">05 / Photographs</div>

        <div>
          <h1 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
            Photographs
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-[#686970]">
            Things I noticed and didn&apos;t want to walk past.
          </p>
        </div>
      </div>

      <PhotographArchive photographs={photographs} />
    </section>
  );
}
