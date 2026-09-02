import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs text-[#4d4e54] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <span>© 2026 Manushresth</span>

        <Link href="/door" className="site-link">
          The Door
        </Link>

        <span>Made slowly. Kept here.</span>
      </div>
    </footer>
  );
}
