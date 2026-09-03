import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A small place for the things I don't want to lose.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <div className="label mb-8">About</div>

      <h1 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
        About
      </h1>

      <div className="mt-16 max-w-xl space-y-8 text-lg leading-8 text-[#85868d] sm:mt-20 sm:text-xl sm:leading-9">
        <p>I&apos;m trying to pay attention.</p>

        <p>
          I write sometimes.
          <br />
          I make things sometimes.
          <br />I collect thoughts I don&apos;t want to lose.
        </p>

        <p>This is a small place for all of that.</p>

        <p className="text-[#4f5056]">—</p>

        <p>Everything here is a work in progress.</p>
      </div>
    </section>
  );
}
