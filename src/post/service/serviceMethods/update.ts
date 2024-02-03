import { CustomError } from "../../../customError/error";
import { postFieldsProvidedByUser } from "../../post";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { PostRepository } from "../../repository/postRepository";

export const update = async (token: string | undefined, postId: string, update: Partial<postFieldsProvidedByUser>) => {
  const user = await validateAuthTokenSignature(token);
  const profile = await ProfileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");
  const post = await PostRepository.getById(postId);
  if (!post) throw new CustomError(404, "Post not found");

  if (post.authorNickName !== profile.nickName)
    throw new CustomError(403, "You are not authorized to update this post");

  return await PostRepository.update(postId, update);
};
