import { postFieldsProvidedByUser } from "../../post";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { CustomError } from "../../../customError/error";
import { PostRepository } from "../../repository/postRepository";
import { PostService } from "../service";

export const create = async function (
  this: PostService,
  post: postFieldsProvidedByUser,
  token?: string
) {
  const user = await validateAuthTokenSignature(this.userRepository, token);

  const profile = await this.profileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  return await PostRepository.create({
    ...post,
    authorNickName: profile.nickName,
    authorAvatar: profile.avatarURL,
    posted: Date.now(),
    views: 0,
    likes: [],
    dislikes: [],
  });
};
