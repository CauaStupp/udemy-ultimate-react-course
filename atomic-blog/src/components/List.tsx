import { type PostType } from "../contexts/postsContext";

type ListProps = {
  posts: PostType[];
};

export function List({ posts }: ListProps) {
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
