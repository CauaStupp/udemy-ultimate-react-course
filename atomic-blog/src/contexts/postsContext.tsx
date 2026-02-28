import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createRandomPost } from "../functions/createRandomPost";

export type PostType = {
  title: string;
  body: string;
};

type PostsContextProviderProps = {
  children: ReactNode;
};

type PostContextType = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleAddPost: (post: PostType) => void;
  handleClearPosts: () => void;
  searchedPosts: PostType[];
  archiveOptions: {
    show: boolean;
    title: string;
  };
};

const PostsContext = createContext<PostContextType | null>(null);

export function PostsContextProvider({ children }: PostsContextProviderProps) {
  const [posts, setPosts] = useState<PostType[]>(() =>
    Array.from({ length: 30 }, () => createRandomPost()),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        )
      : posts;

  const handleAddPost = useCallback(function handleAddPost(post: PostType) {
    setPosts((posts) => [post, ...posts]);
  }, []);

  function handleClearPosts() {
    setPosts([]);
  }

  const archiveOptions = useMemo(() => {
    return {
      show: false,
      title: `Post archive in addition to ${posts.length}`,
    };
  }, [posts.length]);

  const value = useMemo(() => {
    return {
      posts,
      setPosts,
      searchQuery,
      setSearchQuery,
      handleAddPost,
      handleClearPosts,
      searchedPosts,
      archiveOptions,
    };
  }, [searchQuery, searchedPosts]);

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePostsContext() {
  const context = useContext(PostsContext);
  if (!context) throw new Error("Erro no UserContext");
  return context;
}
