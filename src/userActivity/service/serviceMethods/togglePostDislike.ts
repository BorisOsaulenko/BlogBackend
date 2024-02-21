import { CustomError } from "../../../customError/error";
import { PostRepository } from "../../../post/repository/postRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserActivityRepository } from "../../repository/repository";
import { UserActivityService } from "../service";

export const togglePostDislike = async function (
  this: UserActivityService,
  postId: string,
  token?: string
): Promise<void> {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  const post = await PostRepository.getById(postId);
  if (!post) throw new CustomError(404, "Post not found");

  if (post.dislikes.includes(user.email)) {
    this.userActivityRepository.removeLikeSign(postId, user.email);
  } else {
    this.userActivityRepository.dislike(postId, user.email);
  }
};
