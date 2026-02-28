import { usePostsContext } from "../contexts/postsContext";

export function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePostsContext();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}
