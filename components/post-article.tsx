import Link from "next/link";
import ArticleNotes from "@/components/article-notes";
import FurtherReading from "@/components/further-reading";
import MdxContent from "@/components/mdx-content";
import PostCover from "@/components/post-cover";
import QuietMode from "@/components/quiet-mode";
import ReadThisIf from "@/components/read-this-if";
import ReadingProgress from "@/components/reading-progress";
import WanderInvite from "@/components/wander-invite";
import type { Post } from "@/lib/posts";
import { formatMonthYear, getPublishedHrefs } from "@/lib/published";

type Props = {
  post: Post;
  label: string;
  backHref: string;
  backLabel: string;
  moreLabel: string;
  body: "mdx" | "poem";
};

export default function PostArticle({
  post,
  label,
  backHref,
  backLabel,
  moreLabel,
  body,
}: Props) {
  const isEssay = body !== "poem";
  const wanderHrefs = isEssay ? getPublishedHrefs() : [];
  const dated = post.date ? formatMonthYear(post.date) : "";

  return (
    <>
      {isEssay ? <ReadingProgress /> : null}

      <article
        className={
          isEssay ? "article-page" : "article-page article-page--poem"
        }
      >
        <Link href={backHref} className="quiet-hide site-link article-back">
          ← {backLabel}
        </Link>

        <header className="article-header">
          <div className="label">{label}</div>

          <h1 className="display-tight article-title">{post.title}</h1>

          {post.description ? (
            <p className="article-subtitle">{post.description}</p>
          ) : null}

          <p className="article-date">
            {dated || post.date} · Manushresth
          </p>

          {isEssay ? <QuietMode /> : null}

          {isEssay ? (
            <ArticleNotes
              writtenWith={post.writtenWith}
              listening={post.listening}
            />
          ) : null}
        </header>

        {isEssay && post.image ? (
          <PostCover image={post.image} priority />
        ) : null}

        {body === "poem" ? (
          <div className="poem-text">{post.content}</div>
        ) : (
          <div className="article-text article-flow">
            <MdxContent source={post.content} />
          </div>
        )}

        {isEssay ? <ReadThisIf items={post.readIf} /> : null}

        <FurtherReading sources={post.sources} />

        {isEssay ? (
          <div className="article-after">
            <WanderInvite hrefs={wanderHrefs} />
          </div>
        ) : null}

        <div className="quiet-hide article-end">
          <Link href={backHref} className="arrow-link article-more">
            ← {moreLabel}
          </Link>
        </div>
      </article>
    </>
  );
}
