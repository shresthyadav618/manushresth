import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PostArticle from "@/components/post-article";
import { getPost, getPosts, postMetadata } from "@/lib/posts";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPosts("writings").map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("writings", slug);

  if (!post) return { title: "Not found" };

  return postMetadata(post);
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost("writings", slug);

  if (!post) notFound();

  return (
    <PostArticle
      post={post}
      label="Writing"
      backHref="/#writings"
      backLabel="Back to writings"
      moreLabel="More writings"
      body="mdx"
    />
  );
}
