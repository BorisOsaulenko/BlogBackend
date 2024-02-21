import { Profile } from "../../../../profile/profile";
import { ProfileRepository } from "../../../../profile/repository/profileRepository";
import { checkIsUserAllowedUnderPost } from "../../../../utils/checkIsUserAllowedUnderPost";
import { validateAuthTokenSignature } from "../../../../utils/validateAuthTokenSignature";
import { sortByEnum } from "../../../controller/requests/filter";
import { Post } from "../../../post";
import { PostRepository, postFilter } from "../../../repository/postRepository";
import { PostService } from "../../service";
import { sort } from "./sort";
export const getByFilter = async function (
  this: PostService,
  filter: postFilter,
  token?: string
): Promise<Post[]> {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  const posts = await PostRepository.getByFilter(filter);
  const profile = await this.profileRepository.getByEmail(user.email);
  const postsUserCanAccess = posts.filter((post) =>
    checkIsUserAllowedUnderPost(user, post, profile as Profile)
  );
  return sort(postsUserCanAccess, filter.sortBy || sortByEnum.popular);
};
