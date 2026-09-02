import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-32 pt-24 sm:px-8 sm:pt-36">
      <div className="label mb-8">404</div>

      <h1 className="display-tight text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9]">
        This page isn&apos;t here.
      </h1>

      <p className="mt-10 max-w-2xl text-lg leading-8 text-[#85868d] sm:text-xl">
        It may have been moved, or it may never have existed.
      </p>

      <div className="mt-24 border-t border-line pt-8">
        <Link
          href="/"
          className="arrow-link text-xs uppercase tracking-[0.25em] text-[#66676d]"
        >
          ← Back home
        </Link>
      </div>
    </section>
  );
}
