"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Writings", number: "01", href: "/#writings" },
    { label: "Poems", number: "02", href: "/#poems" },
    { label: "Life", number: "03", href: "/#life" },
    { label: "Days", number: "04", href: "/days" },
    { label: "Photographs", number: "05", href: "/photographs" },
    { label: "Now", number: "06", href: "/now" },
    { label: "About", number: "07", href: "/#about" },
  ];

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-[12px] font-semibold uppercase tracking-[0.32em] text-ink"
        >
          Manushresth
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="site-link text-[13px] text-[#777980]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          className="group flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className="relative block h-[14px] w-[22px]">
            <span
              className={`absolute left-0 block h-px w-full bg-[#85868d] transition-all duration-300 ${
                open
                  ? "top-[6px] rotate-45"
                  : "top-[2px] group-hover:translate-y-[2px]"
              }`}
            />

            <span
              className={`absolute left-0 block h-px w-full bg-[#85868d] transition-all duration-300 ${
                open
                  ? "top-[6px] -rotate-45"
                  : "top-[11px] group-hover:-translate-y-[2px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="mobile-menu border-t border-line bg-page lg:hidden">
          <nav className="px-6 pb-8 pt-2 sm:px-8">

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-line py-6"
              >
                <div className="flex items-center gap-5">

                  <span className="text-[10px] tracking-[0.25em] text-[#4f5056]">
                    {link.number}
                  </span>

                  <span className="display text-2xl text-[#d9d5cd] transition-colors duration-200 group-hover:text-ink">
                    {link.label}
                  </span>

                </div>

                <span className="card-arrow text-lg text-[#55565c]">
                  →
                </span>
              </Link>
            ))}

          </nav>

          <div className="px-6 pb-7 pt-2 sm:px-8">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#45464c]">
              A little place on the internet
            </p>
          </div>
        </div>
      )}
    </header>
  );
}