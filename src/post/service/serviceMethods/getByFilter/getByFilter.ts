import { Profile } from "../../../../profile/profile";
import { ProfileRepository } from "../../../../profile/repository/profileRepository";
import { checkIsUserAllowedUnderPost } from "../../../../utils/checkIsUserAllowedUnderPost";
import { validateAuthTokenSignature } from "../../../../utils/validateAuthTokenSignature";
import { sortByEnum } from "../../../controller/requests/filter";
import { Post } from "../../../post";
import { PostRepository, postFilter } from "../../../repository/postRepository";
import { sort } from "./sort";
export const getByFilter = async (
  filter: postFilter,
  token?: string
): Promise<Post[]> => {
  const user = await validateAuthTokenSignature(token);
  const posts = await PostRepository.getByFilter(filter);
  const profile = await ProfileRepository.getByEmail(user.email);
  const postsUserCanAccess = posts.filter((post) =>
    checkIsUserAllowedUnderPost(user, post, profile as Profile)
  );
  return sort(postsUserCanAccess, filter.sortBy || sortByEnum.popular);
};
