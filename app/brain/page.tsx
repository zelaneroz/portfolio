import Brain from "../../components/Brain";
import { getAllBrainPosts } from "../../lib/brain-posts";

export default async function BrainPage() {
  const posts = await getAllBrainPosts();

  return <Brain posts={posts} />;
}