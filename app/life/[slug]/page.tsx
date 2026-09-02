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
  return getPosts("life").map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("life", slug);

  if (!post) return { title: "Not found" };

  return postMetadata(post);
}

export default async function LifePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost("life", slug);

  if (!post) notFound();

  return (
    <PostArticle
      post={post}
      label="Life"
      backHref="/#life"
      backLabel="Back to life"
      moreLabel="More life"
      body="mdx"
    />
  );
}
