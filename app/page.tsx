import FeaturedPiece from "@/components/featured-piece";
import Fragments from "@/components/fragments";
import PhotographArchive from "@/components/photograph-archive";
import PostListRow from "@/components/post-list-row";
import SecretInvite from "@/components/secret-invite";
import SelectedPieces from "@/components/selected-pieces";
import WanderInvite from "@/components/wander-invite";
import { aFewThings, fragments, onMyMind } from "@/content/discovery";
import { now } from "@/content/now-page";
import { dayPreview, getDays } from "@/lib/days";
import { getPhotographs } from "@/lib/photographs";
import { getPosts } from "@/lib/posts";
import { getPostByHref, getPublishedHrefs } from "@/lib/published";
import Link from "next/link";

export default function Home() {
  const writings = getPosts("writings");
  const poems = getPosts("poems");
  const life = getPosts("life");
  const days = getDays().slice(0, 3);
  const photographs = getPhotographs().slice(0, 3);
  const wanderHrefs = getPublishedHrefs();
  const featured = getPostByHref(onMyMind.href);
  const selected = aFewThings.flatMap((href) => {
    const post = getPostByHref(href);
    return post ? [post] : [];
  });

  return (
    <main>
      <section className="mx-auto flex min-h-[calc(100svh-70px)] max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-10">
        <div className="max-w-[1200px]">
          <p className="label mb-10">A little place on the internet</p>

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
              Thoughts, poems, photographs, things I&apos;m learning, and little
              pieces of life that I don&apos;t want time to take away.
            </p>
          </div>
        </div>

        <div className="mt-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#4d4e54] sm:mt-24">
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      <section className="home-band">
        <div className="home-band-inner">
          <div className="label">Lately</div>
          <FeaturedPiece
            href={onMyMind.href}
            title={onMyMind.title}
            line={onMyMind.line}
            post={featured}
          />
        </div>
      </section>

      <section className="home-band home-band--quiet">
        <div className="home-band-inner">
          <div className="label">Fragments</div>
          <Fragments items={fragments} />
        </div>
      </section>

      <section className="home-band">
        <div className="home-band-inner">
          <div className="label">A few things I&apos;ve written</div>
          <SelectedPieces posts={selected} />
        </div>
      </section>

      <section className="home-band home-band--invite">
        <div className="home-band-inner home-invite-row">
          <WanderInvite hrefs={wanderHrefs} />
          <SecretInvite hrefs={wanderHrefs} />
        </div>
      </section>

      <section id="writings" className="home-band">
        <div className="home-band-inner">
          <div className="section-heading">
            <div className="label">01 / Writings</div>
            <div>
              <h2 className="display section-title">Writings</h2>
              <p className="section-lede">Things I think about.</p>
            </div>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {writings.map((post) => (
              <PostListRow
                key={post.slug}
                post={post}
                href={`/writings/${post.slug}`}
                label="Writing"
              />
            ))}

            {writings.length === 0 && (
              <p className="empty-note">Nothing here yet.</p>
            )}
          </div>
        </div>
      </section>

      <section id="poems" className="home-band">
        <div className="home-band-inner">
          <div className="section-heading">
            <div className="label">02 / Poems</div>
            <div>
              <h2 className="display section-title">Poems</h2>
              <p className="section-lede">
                Things I can&apos;t quite say normally.
              </p>
            </div>
          </div>

          <div className="poem-index">
            {poems.map((post) => (
              <Link
                key={post.slug}
                href={`/poems/${post.slug}`}
                className="poem-tile"
              >
                <span className="label">Poem</span>

                <div className="poem-tile-body">
                  <h3 className="display poem-tile-title">{post.title}</h3>

                  {post.description ? (
                    <p className="poem-tile-lede">{post.description}</p>
                  ) : null}

                  <span className="poem-tile-read">Read poem →</span>
                </div>
              </Link>
            ))}

            {poems.length === 0 && (
              <p className="empty-note poem-index-empty">Nothing here yet.</p>
            )}
          </div>
        </div>
      </section>

      <section id="life" className="home-band">
        <div className="home-band-inner">
          <div className="section-heading">
            <div className="label">03 / Life</div>
            <div>
              <h2 className="display section-title">Life</h2>
              <p className="section-lede">Things I learn from living.</p>
            </div>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {life.map((post) => (
              <PostListRow
                key={post.slug}
                post={post}
                href={`/life/${post.slug}`}
                label="Life"
              />
            ))}

            {life.length === 0 && (
              <p className="empty-note">Nothing here yet.</p>
            )}
          </div>
        </div>
      </section>

      <section id="days" className="home-band">
        <div className="home-band-inner">
          <div className="section-heading">
            <div className="label">04 / Days</div>
            <div>
              <h2 className="display section-title">Days</h2>
              <p className="section-lede">
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
              <p className="empty-note">Nothing here yet.</p>
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

      <section id="photographs" className="home-band">
        <div className="home-band-inner">
          <div className="section-heading">
            <div className="label">05 / Photographs</div>
            <div>
              <h2 className="display section-title">Photographs</h2>
              <p className="section-lede">
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

      <section id="listening" className="home-band">
        <div className="home-band-inner">
          <div className="section-heading">
            <div className="label">06 / Listening</div>
            <div>
              <h2 className="display section-title">Listening</h2>
              <p className="section-lede">Songs I&apos;ve kept around.</p>
            </div>
          </div>

          <div className="md:pl-[212px]">
            <p className="max-w-xl text-lg leading-8 text-[#85868d] sm:text-xl sm:leading-9">
              A small collection of songs, playing here.
            </p>
            <div className="mt-12">
              <Link
                href="/listening"
                className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
              >
                Listening →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="now" className="home-band">
        <div className="home-band-inner">
          <div className="section-heading">
            <div className="label">07 / Now</div>
            <div>
              <h2 className="display section-title">Now</h2>
              <p className="section-lede">A small record of where I am lately.</p>
            </div>
          </div>

          <div className="md:pl-[212px]">
            <p className="label mb-6">{now.updated}</p>
            <p className="max-w-2xl text-lg leading-8 text-[#85868d] sm:text-xl sm:leading-9">
              {now.lately}
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
        </div>
      </section>

      <section id="about" className="home-band home-band--last">
        <div className="home-band-inner">
          <div className="section-heading">
            <div className="label">08 / About</div>
            <div className="max-w-4xl">
              <h2 className="display section-title">About</h2>
              <div className="mt-14 space-y-7 text-lg leading-8 text-[#85868d] sm:text-xl sm:leading-9">
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
              <div className="mt-12">
                <Link
                  href="/about"
                  className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
                >
                  About →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
