import type { Metadata } from "next";
import { now } from "@/content/now-page";

export const metadata: Metadata = {
  title: "Now",
  description: "A small record of where I am lately.",
};

const fields = [
  { label: "Reading", value: now.reading },
  { label: "Listening", value: now.listening },
  { label: "Building", value: now.building },
  { label: "Learning", value: now.learning },
  { label: "Thinking about", value: now.thinking },
  { label: "Lately", value: now.lately },
];

export default function NowPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <div className="label mb-8">Now</div>

      <h1 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
        Now
      </h1>

      <p className="mt-8 max-w-md text-base leading-7 text-[#686970]">
        A small record of where I am lately.
      </p>

      <div className="mt-20 max-w-xl divide-y divide-line border-y border-line sm:mt-24">
        {fields.map((field) => (
          <div key={field.label} className="py-10">
            <div className="label mb-4">{field.label}</div>
            <p className="max-w-lg text-lg leading-8 text-[#d0cdc5]">
              {field.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-[10px] uppercase tracking-[0.3em] text-[#4f5056]">
        Last updated · {now.updated}
      </p>
    </section>
  );
}
