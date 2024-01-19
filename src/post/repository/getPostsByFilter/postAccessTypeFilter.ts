import { Role, User } from "../../../user/user";
import { Post, PostType } from "../../post";

export const postAccessTypeFilter = (posts: Post[], user: User) => {
  const { roles, sponsors } = user;
  if (roles.includes(Role.ADMIN)) return posts;
  else {
    const privatePostFilter = posts.filter((post) => {
      if (post.type !== PostType.PRIVATE) return true;
      return post.allowedUsers?.includes(user.email);
    });

    if (roles.includes(Role.SPONSOR))
      return privatePostFilter.filter((post) =>
        sponsors.includes(post.authorName)
      );
    return privatePostFilter.filter((post) => post.type === PostType.PUBLIC);
  }
};
