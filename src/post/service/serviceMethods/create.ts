import { postFieldsProvidedByUser } from "../../post";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileRepository } from "../../../profile/repository/profileRepository";
import { CustomError } from "../../../customError/error";
import { PostRepository } from "../../repository/postRepository";

export const create = async (post: postFieldsProvidedByUser, token?: string) => {
  const user = await validateAuthTokenSignature(token);

  const profile = await profileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  return await PostRepository.create({
    ...post,
    authorName: profile.nickName,
    authorAvatar: profile.avatarURL,
    posted: Date.now(),
    views: 0,
    likes: [],
  });
};
