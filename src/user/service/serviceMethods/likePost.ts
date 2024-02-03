import { CustomError } from "../../../customError/error";
import { PostRepository } from "../../../post/repository/postRepository";
import { checkIsUserAllowedUnderPost } from "../../../utils/checkIsUserAllowedUnderPost";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserRepository } from "../../repository/userRepository";

export const likePost = async (postId: string, token?: string) => {
  const user = await validateAuthTokenSignature(token);
  const postToLike = await PostRepository.getById(postId);
  if (!postToLike) throw new CustomError(400, "Post not found");
  if (!checkIsUserAllowedUnderPost(user, postToLike)) throw new CustomError(403, "You cannot like this post");
  if (postToLike.likes.includes(user.email)) throw new CustomError(400, "You already liked this post");

  return await UserRepository.likePost(user.email, postId);
};
