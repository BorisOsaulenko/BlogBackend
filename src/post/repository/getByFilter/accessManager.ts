import { WithId } from "mongodb";
import { Role, User } from "../../../user/user";
import { Post, PostType } from "../../post";

export const accessManager = (user: User, posts: WithId<Post>[]): WithId<Post>[] => {
  if (user.roles.includes(Role.ADMIN)) return posts;
  else {
    const privatePostFilter = posts.filter((post) => {
      if (post.type === PostType.PRIVATE) return post.allowedUsers?.includes(user.email);
    });

    const sponsorsFilter = privatePostFilter.filter((post) => {
      if (post.type === PostType.SPONSORS) return user.sponsors.includes(post.authorName);
    });

    return sponsorsFilter;
  }
};
