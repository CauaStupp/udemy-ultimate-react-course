import { usePostsContext } from "../contexts/postsContext";
import { List } from "./List";

export function Posts() {
  const { searchedPosts } = usePostsContext();

  return (
    <section>
      <List posts={searchedPosts} />
    </section>
  );
}
