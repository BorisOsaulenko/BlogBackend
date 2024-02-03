import { CustomError } from "../../../customError/error";
import { PostRepository } from "../../../post/repository/postRepository";
import { checkIsUserAllowedUnderPost } from "../../../utils/checkIsUserAllowedUnderPost";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserRepository } from "../../repository/userRepository";

export const unlikePost = async (postId: string, token?: string) => {
  const user = await validateAuthTokenSignature(token);
  const postToUnlike = await PostRepository.getById(postId);
  if (!postToUnlike) throw new CustomError(400, "Post not found");
  if (!checkIsUserAllowedUnderPost(user, postToUnlike)) throw new CustomError(403, "You cannot unlike this post");
  if (!postToUnlike.likes.includes(user.email)) throw new CustomError(400, "You haven't liked this post");

  return await UserRepository.unlikePost(user.email, postId);
};
