import { posts } from "../../../components/ThoughtsItems";
import ThoughtsPage from "../../../components/Thoughtspage";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);
  if (!post) notFound();
  return <ThoughtsPage post={post} />;
}