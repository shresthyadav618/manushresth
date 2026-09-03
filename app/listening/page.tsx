import type { Metadata } from "next";
import ListeningList from "@/components/listening-list";

export const metadata: Metadata = {
  title: "Listening",
  description: "Songs I've kept around.",
};

export default function ListeningPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <div className="label mb-8">Listening</div>

      <h1 className="display-tight text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9]">
        Listening
      </h1>

      <p className="mt-8 max-w-md text-base leading-7 text-[#686970]">
        Songs I&apos;ve kept around.
      </p>

      <div className="mt-20 sm:mt-24">
        <ListeningList />
      </div>

      <p className="listening-aside">Press play. Stay for a while.</p>
    </section>
  );
}
