import Link from "next/link";
import SiteHeader from "@/components/site-header";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const writings = getPosts("writings");
  const poems = getPosts("poems");
  const life = getPosts("life");

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-[#eeeae1]">
      <SiteHeader />

      {/* HERO */}
      <section className="mx-auto flex min-h-[calc(100svh-70px)] max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-10">
        <div className="max-w-[1200px]">

          <p className="label mb-10">
            A little place on the internet
          </p>

          <h1 className="display-tight max-w-[1100px] text-[clamp(4rem,10vw,9.5rem)] leading-[0.86] text-[#eeeae1]">
            I write things down
            <br />
            so I don't forget
            <br />
            that I was here.
          </h1>

          <div className="mt-14 flex items-start gap-7 sm:mt-16">
            <span className="mt-3 block h-px w-16 shrink-0 bg-[#4b4c51]" />

            <p className="max-w-[650px] text-base leading-7 text-[#777980] sm:text-lg sm:leading-8">
              Thoughts, poems, photographs, things I'm learning,
              and little pieces of life that I don't want time to take away.
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
        className="border-t border-[#25262a]"
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

          <div className="divide-y divide-[#25262a] border-y border-[#25262a]">
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
        className="border-t border-[#25262a]"
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
                Things I couldn't say normally.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 border border-[#25262a] md:grid-cols-2">

            {poems.map((post) => (
              <Link
                key={post.slug}
                href={`/poems/${post.slug}`}
                className="archive-card group min-h-[340px] border-b border-[#25262a] p-7 sm:p-10 md:min-h-[400px] md:border-b-0 md:border-r md:last:border-r-0"
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

          </div>

        </div>
      </section>

      {/* LIFE */}
      <section
        id="life"
        className="border-t border-[#25262a]"
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
                Things I'm learning while actually living it.
              </p>
            </div>

          </div>

          <div className="divide-y divide-[#25262a] border-y border-[#25262a]">
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
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-[#25262a]"
      >
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-8 sm:py-44 lg:px-10">

          <div className="grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">

            <div className="label">
              04 / About
            </div>

            <div className="max-w-4xl">

              <h2 className="display text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
                I'm Manushresth.
              </h2>

              <div className="mt-14 space-y-7 text-lg leading-8 text-[#85868d] sm:text-xl sm:leading-9">

                <p>
                  I'm trying to pay attention to life while it's happening.
                </p>

                <p>
                  This is a small place for the things I write,
                  the things I notice, and the moments I don't want
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

      {/* FOOTER */}
      <footer className="border-t border-[#25262a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs text-[#4d4e54] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

          <span>
            © 2026 Manushresth
          </span>

          <span>
            Made slowly. Kept here.
          </span>

        </div>
      </footer>

    </main>
  );
}