import { usePostsContext } from "../contexts/postsContext";

export function Results() {
  const { posts } = usePostsContext();

  return <p>🚀 {posts.length} atomic posts found</p>;
}
