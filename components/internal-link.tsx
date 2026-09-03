import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  slug?: string;
  children: ReactNode;
};

export default function InternalLink({ href, slug, children }: Props) {
  return (
    <span className="internal-continue">
      <Link href={slug ?? href} className="internal-continue-link">
        {children}
      </Link>
    </span>
  );
}
