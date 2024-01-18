import { Role, User } from "../../../user/user";
import { Post, PostType } from "../../post";

export const postAccessTypeFilter = async (posts: Post[], user: User) => {
  const { roles, sponsors } = user;
  if (roles.includes(Role.ADMIN)) return posts;
  if (roles.includes(Role.SPONSOR))
    return posts.filter((post) => sponsors.includes(post.authorName));
  return posts.filter((post) => post.type === PostType.PUBLIC);
};
