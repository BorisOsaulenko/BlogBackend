import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { PostRepository } from "../../repository/postRepository";
import { PostService } from "../service";

export const deletePost = async function (
  this: PostService,
  postId: string,
  token?: string
) {
  const user = await validateAuthTokenSignature(this.userRepository, token);

  const profile = await this.profileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  const post = await PostRepository.getById(postId);
  if (!post) throw new CustomError(404, "Post not found");

  if (post.authorNickName !== profile.nickName)
    throw new CustomError(403, "You are not authorized to delete this post");

  return await PostRepository.delete(postId);
};
