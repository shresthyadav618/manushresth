import Link from "next/link";
import PhotographArchive from "@/components/photograph-archive";
import { dayPreview, getDays } from "@/lib/days";
import { getCurrentNow, nowPreview } from "@/lib/now";
import { getPhotographs } from "@/lib/photographs";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const writings = getPosts("writings");
  const poems = getPosts("poems");
  const life = getPosts("life");
  const days = getDays().slice(0, 3);
  const photographs = getPhotographs().slice(0, 3);
  const currentNow = getCurrentNow();

  return (
    <main>
      {/* HERO */}
      <section className="mx-auto flex min-h-[calc(100svh-70px)] max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-10">
        <div className="max-w-[1200px]">
          <p className="label mb-10">
            A little place on the internet
          </p>

          <h1 className="display-tight max-w-[1100px] text-[clamp(4rem,10vw,9.5rem)] leading-[0.86] text-ink">
            I write things down
            <br />
            so I don&apos;t forget
            <br />
            that I was here.
          </h1>

          <div className="mt-14 flex items-start gap-7 sm:mt-16">
            <span className="mt-3 block h-px w-16 shrink-0 bg-[#4b4c51]" />

            <p className="max-w-[650px] text-base leading-7 text-[#777980] sm:text-lg sm:leading-8">
              Thoughts, poems, photographs, things I&apos;m learning,
              and little pieces of life that I don&apos;t want time to take away.
            </p>
          </div>
        </div>

        <div className="mt-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#4d4e54] sm:mt-24">
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* WRITINGS */}
      <section
        id="writings"
        className="border-t border-line"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-10">

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <div className="label">
              01 / Writings
            </div>

            <div>
              <h2 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
                Writings
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-[#686970]">
                Things that needed more than a passing thought.
              </p>
            </div>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {writings.map((post) => (
              <Link
                key={post.slug}
                href={`/writings/${post.slug}`}
                className="archive-card group block py-10 sm:py-12"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-[180px_1fr_auto] md:gap-8">

                  <span className="label">
                    Writing
                  </span>

                  <div>
                    <h3 className="display text-3xl sm:text-4xl">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#717279] sm:text-base">
                        {post.description}
                      </p>
                    )}
                  </div>

                  <span className="card-arrow text-xl text-[#55565c]">
                    →
                  </span>

                </div>
              </Link>
            ))}

            {writings.length === 0 && (
              <p className="py-12 text-[#66676d]">
                Nothing here yet.
              </p>
            )}
          </div>

        </div>
      </section>

      {/* POEMS */}
      <section
        id="poems"
        className="border-t border-line"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-10">

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">

            <div className="label">
              02 / Poems
            </div>

            <div>
              <h2 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
                Poems
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-[#686970]">
                Things I couldn&apos;t say normally.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 border border-line md:grid-cols-2">

            {poems.map((post) => (
              <Link
                key={post.slug}
                href={`/poems/${post.slug}`}
                className="archive-card group min-h-[340px] border-b border-line p-7 sm:p-10 md:min-h-[400px] md:border-r md:[&:nth-child(even)]:border-r-0"
              >
                <div className="flex h-full flex-col justify-between">

                  <div className="flex items-start justify-between gap-4">
                    <span className="label">
                      Poem
                    </span>

                    <span className="text-xs text-[#55565c]">
                      {post.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="display text-4xl sm:text-5xl">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="mt-5 max-w-xl text-sm leading-7 text-[#717279]">
                        {post.description}
                      </p>
                    )}

                    <div className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#55565c]">
                      Read poem →
                    </div>
                  </div>

                </div>
              </Link>
            ))}

            {poems.length === 0 && (
              <p className="col-span-full py-12 text-[#66676d]">
                Nothing here yet.
              </p>
            )}

          </div>

        </div>
      </section>

      {/* LIFE */}
      <section
        id="life"
        className="border-t border-line"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-10">

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">

            <div className="label">
              03 / Life
            </div>

            <div>
              <h2 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
                Life
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-[#686970]">
                Things I&apos;m learning while actually living it.
              </p>
            </div>

          </div>

          <div className="divide-y divide-line border-y border-line">
            {life.map((post) => (
              <Link
                key={post.slug}
                href={`/life/${post.slug}`}
                className="archive-card group block py-10 sm:py-12"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-[180px_1fr_auto] md:gap-8">

                  <span className="label">
                    Life
                  </span>

                  <div>
                    <h3 className="display text-3xl sm:text-4xl">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#717279] sm:text-base">
                        {post.description}
                      </p>
                    )}
                  </div>

                  <span className="card-arrow text-xl text-[#55565c]">
                    →
                  </span>

                </div>
              </Link>
            ))}

            {life.length === 0 && (
              <p className="py-12 text-[#66676d]">
                Nothing here yet.
              </p>
            )}
          </div>

        </div>
      </section>

      {/* DAYS */}
      <section
        id="days"
        className="border-t border-line"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-10">

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <div className="label">
              04 / Days
            </div>

            <div>
              <h2 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
                Days
              </h2>

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
                  <span className="label">
                    {day.date}
                  </span>

                  <p className="max-w-2xl text-base leading-7 text-[#d0cdc5]">
                    {dayPreview(day)}
                  </p>

                  <span className="card-arrow text-xl text-[#55565c]">
                    →
                  </span>
                </div>
              </Link>
            ))}

            {days.length === 0 && (
              <p className="py-12 text-[#66676d]">
                Nothing here yet.
              </p>
            )}
          </div>

          <div className="mt-12">
            <Link
              href="/days"
              className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
            >
              All days →
            </Link>
          </div>

        </div>
      </section>

      {/* PHOTOGRAPHS */}
      <section
        id="photographs"
        className="border-t border-line"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-10">

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <div className="label">
              05 / Photographs
            </div>

            <div>
              <h2 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
                Photographs
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-[#686970]">
                Things I noticed and didn&apos;t want to walk past.
              </p>
            </div>
          </div>

          <PhotographArchive photographs={photographs} />

          <div className="mt-12">
            <Link
              href="/photographs"
              className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
            >
              All photographs →
            </Link>
          </div>

        </div>
      </section>

      {/* NOW */}
      <section
        id="now"
        className="border-t border-line"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-10">

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <div className="label">
              06 / Now
            </div>

            <div>
              <h2 className="display text-5xl leading-none sm:text-6xl lg:text-7xl">
                Now
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-[#686970]">
                A small glimpse of the present.
              </p>
            </div>
          </div>

          {currentNow ? (
            <div className="md:pl-[212px]">
              <p className="label mb-6">{currentNow.date}</p>

              <p className="max-w-2xl text-lg leading-8 text-[#85868d] sm:text-xl sm:leading-9">
                {nowPreview(currentNow)}
              </p>

              <div className="mt-12">
                <Link
                  href="/now"
                  className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
                >
                  Now →
                </Link>
              </div>
            </div>
          ) : (
            <p className="py-12 text-[#66676d]">
              Nothing here yet.
            </p>
          )}

        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-line"
      >
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-8 sm:py-44 lg:px-10">

          <div className="grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">

            <div className="label">
              07 / About
            </div>

            <div className="max-w-4xl">

              <h2 className="display text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
                I&apos;m Manushresth.
              </h2>

              <div className="mt-14 space-y-7 text-lg leading-8 text-[#85868d] sm:text-xl sm:leading-9">

                <p>
                  I&apos;m trying to pay attention to life while it&apos;s happening.
                </p>

                <p>
                  This is a small place for the things I write,
                  the things I notice, and the moments I don&apos;t want
                  to disappear.
                </p>

              </div>

              <p className="mt-12 text-[10px] uppercase tracking-[0.35em] text-[#4f5056]">
                Gurgaon · India · Somewhere on the internet
              </p>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
