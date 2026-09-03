import type { Listening } from "@/lib/posts";

type Props = {
  writtenWith: string;
  listening: Listening | null;
};

export default function ArticleNotes({ writtenWith, listening }: Props) {
  if (!writtenWith && !listening) {
    return null;
  }

  return (
    <div className="article-notes">
      {writtenWith ? (
        <div>
          <div className="label mb-3">Written with</div>
          <p className="whitespace-pre-line text-sm leading-7 text-[#66676d]">
            {writtenWith}
          </p>
        </div>
      ) : null}

      {listening ? (
        <div>
          <div className="label mb-3">Listening while writing</div>
          <p className="text-sm leading-7 text-[#66676d]">
            {listening.title}
            {listening.artist ? ` · ${listening.artist}` : ""}
          </p>
          {listening.href ? (
            <a
              href={listening.href}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link mt-3 text-[10px] uppercase tracking-[0.25em] text-[#55565c]"
            >
              Listen →
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
