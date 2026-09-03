import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
} from "react";
import EditorialImage from "@/components/editorial-image";
import InternalLink from "@/components/internal-link";
import PullQuote from "@/components/pull-quote";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
  em: (props: HTMLAttributes<HTMLElement>) => <em {...props} />,
  strong: (props: HTMLAttributes<HTMLElement>) => <strong {...props} />,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
  ul: (props: HTMLAttributes<HTMLUListElement>) => <ul {...props} />,
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
  EditorialImage,
  InternalLink,
  PullQuote,
};

export default async function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
