import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PullQuote({ children }: Props) {
  return <blockquote className="pull-quote">{children}</blockquote>;
}
