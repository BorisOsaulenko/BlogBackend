import { Post, PostType } from "../post/post";
import { Role, User } from "../user/user";

export const checkIsUserAllowedUnderPost = (user: User, post: Post): boolean => {
  if (user.roles.includes(Role.ADMIN)) return true;
  if (post.blockedUsers?.includes(user.email)) return false;
  if (post.type === PostType.PUBLIC) return true;
  if (post.type === PostType.SPONSORS) return user.sponsors.includes(post.authorNickName);
  if (post.type === PostType.PRIVATE) return post.allowedUsers!.includes(user.email);
  // if type is private allowed users is set
  return false;
};
