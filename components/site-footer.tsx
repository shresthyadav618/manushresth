import Link from "next/link";
import WanderLink from "@/components/wander-link";
import { getPublishedHrefs } from "@/lib/published";

const links = [
  { label: "Writings", href: "/#writings" },
  { label: "Poems", href: "/#poems" },
  { label: "Life", href: "/#life" },
  { label: "Photographs", href: "/photographs" },
  { label: "Listening", href: "/listening" },
  { label: "Now", href: "/now" },
  { label: "Index", href: "/index" },
  { label: "About", href: "/about" },
];

export default function SiteFooter() {
  const hrefs = getPublishedHrefs();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" className="site-mark site-mark--quiet">
          Manushresth
        </Link>

        <p className="site-footer-line">
          A small place for things I don&apos;t want to lose.
        </p>

        <nav className="site-footer-nav" aria-label="Footer">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="site-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer-wander">
          <WanderLink hrefs={hrefs} />
        </div>

        <p className="site-footer-colophon">
          © 2026 · Made slowly. Kept here.
        </p>
      </div>
    </footer>
  );
}
