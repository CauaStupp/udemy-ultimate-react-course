import { usePostsContext } from "../contexts/postsContext";
import { Results } from "./Results";
import { SearchPosts } from "./SearchPosts";

export function Header() {
  const { handleClearPosts } = usePostsContext();

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={handleClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}
