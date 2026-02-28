import { posts } from "../../../components/ThoughtsItems";
import ThoughtsPage from "../../../components/Thoughtspage";
import { notFound } from "next/navigation";

// Pre-generates a route for every post at build time
export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

export default function Page({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) notFound();
  return <ThoughtsPage post={post} />;
}