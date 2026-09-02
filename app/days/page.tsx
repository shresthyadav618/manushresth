import Link from "next/link";
import type { Metadata } from "next";
import { dayPreview, getDays } from "@/lib/days";

export const metadata: Metadata = {
  title: "Days",
  description: "A chronological archive of ordinary days.",
};

export default function DaysPage() {
  const days = getDays();

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-10">
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
        <div className="label">04 / Days</div>

        <div>
          <h1 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
            Days
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-[#686970]">
            Ordinary days, written down so they don&apos;t disappear.
          </p>
        </div>
      </div>

      <div className="divide-y divide-line border-y border-line">
        {days.map((day) => (
          <Link
            key={day.slug}
            href={`/days/${day.slug}`}
            className="archive-card group block py-10 sm:py-12"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[180px_1fr_auto] md:gap-8">
              <span className="label">{day.date}</span>

              <p className="max-w-2xl text-base leading-7 text-[#d0cdc5]">
                {dayPreview(day)}
              </p>

              <span className="card-arrow text-xl text-[#55565c]">→</span>
            </div>
          </Link>
        ))}

        {days.length === 0 && (
          <p className="py-12 text-[#66676d]">Nothing here yet.</p>
        )}
      </div>
    </section>
  );
}
