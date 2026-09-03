"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Writings", number: "01", href: "/#writings" },
  { label: "Poems", number: "02", href: "/#poems" },
  { label: "Life", number: "03", href: "/#life" },
  { label: "Days", number: "04", href: "/days" },
  { label: "Photographs", number: "05", href: "/photographs" },
  { label: "Listening", number: "06", href: "/listening" },
  { label: "Now", number: "07", href: "/now" },
  { label: "About", number: "08", href: "/about" },
];

function isCurrent(pathname: string, href: string) {
  if (href.startsWith("/#")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header-inner">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="site-mark"
        >
          Manushresth
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isCurrent(pathname, link.href)
                  ? "site-nav-link is-current"
                  : "site-nav-link"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          className={open ? "menu-toggle is-open" : "menu-toggle"}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open ? (
        <div className="mobile-menu">
          <nav className="mobile-nav" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  isCurrent(pathname, link.href)
                    ? "mobile-nav-link is-current"
                    : "mobile-nav-link"
                }
              >
                <span className="mobile-nav-number">{link.number}</span>
                <span className="display mobile-nav-label">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
