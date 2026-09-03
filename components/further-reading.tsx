import type { PostSource } from "@/lib/posts";

export default function FurtherReading({ sources }: { sources: PostSource[] }) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <aside className="further-reading">
      <div className="label mb-8">Further reading</div>

      <ul className="space-y-6">
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {source.label ? (
                <div className="text-[10px] uppercase tracking-[0.28em] text-[#55565c]">
                  {source.label}
                </div>
              ) : null}
              <div className="mt-2 text-sm leading-6 text-[#85868d] transition-colors duration-200 group-hover:text-[#d0cdc5]">
                {source.title} ↗
              </div>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
