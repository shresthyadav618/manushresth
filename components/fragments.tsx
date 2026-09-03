import Link from "next/link";

type Fragment = {
  text: string;
  title: string;
  href: string;
};

export default function Fragments({ items }: { items: Fragment[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fragments">
      {items.slice(0, 4).map((fragment) => (
        <Link
          key={fragment.href + fragment.text}
          href={fragment.href}
          className="fragment-card"
        >
          <p className="fragment-text">{fragment.text}</p>
          <p className="fragment-source">{fragment.title}</p>
        </Link>
      ))}
    </div>
  );
}
