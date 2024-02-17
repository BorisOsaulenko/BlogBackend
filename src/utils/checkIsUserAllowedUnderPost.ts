import { Post, PostType } from "../post/post";
import { Profile } from "../profile/profile";
import { Role, User } from "../user/user";

export const checkIsUserAllowedUnderPost = (
  user: User,
  post: Post,
  profile?: Profile
): boolean => {
  if (user.roles.includes(Role.ADMIN)) return true;
  if (post.blockedUsers?.includes(user.email)) return false;
  if (post.type === PostType.PUBLIC) return true;
  if (
    post.type === PostType.SPONSORS &&
    user.roles.includes(Role.SPONSOR) &&
    profile
  )
    return profile?.sponsors.includes(post.authorNickName);
  if (post.type === PostType.PRIVATE)
    // if type is private allowed users is set
    return post.allowedUsers!.includes(user.email);

  return false;
};
