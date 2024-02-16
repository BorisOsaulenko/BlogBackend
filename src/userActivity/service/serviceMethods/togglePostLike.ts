import { CustomError } from "../../../customError/error";
import { PostRepository } from "../../../post/repository/postRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserActivityRepository } from "../../repository/repository";

export const togglePostLike = async (
  postId: string,
  token?: string
): Promise<void> => {
  const user = await validateAuthTokenSignature(token);
  const post = await PostRepository.getById(postId);
  if (!post) throw new CustomError(404, "Post not found");

  if (post.likes.includes(user.email)) {
    UserActivityRepository.removeLikeSign(postId, user.email);
  } else {
    UserActivityRepository.like(postId, user.email);
  }
};
