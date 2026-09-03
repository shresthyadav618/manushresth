"use client";

import type { ReactNode } from "react";

type Props = {
  hrefs: string[];
  children?: ReactNode;
  className?: string;
};

export default function WanderLink({
  hrefs,
  children = "Wander →",
  className = "arrow-link wander-link",
}: Props) {
  return (
    <a
      href="/wander"
      className={className}
      onClick={(event) => {
        if (hrefs.length === 0) {
          return;
        }

        event.preventDefault();
        const href = hrefs[Math.floor(Math.random() * hrefs.length)];
        window.location.assign(href);
      }}
    >
      {children}
    </a>
  );
}
