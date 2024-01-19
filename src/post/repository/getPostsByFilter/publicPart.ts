import { Post } from "../../post";

export const publicPart = (posts: Post[]) => {
  return posts.map((post) => {
    const { allowedUsers, likes, ...publicPart } = post;
    return { ...publicPart, likes: likes.length };
  });
};
