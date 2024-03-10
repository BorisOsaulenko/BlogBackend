import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { CommentRepository } from "../../repository/commentRepository";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { PostRepository } from "../../../post/repository/postRepository";
import { CommentService } from "../service";

export const deleteComment = async function (
  this: CommentService,
  id: string,
  token?: string
) {
  if (!token) throw new CustomError(401, "Not authorized");
  const user = await validateAuthTokenSignature(this.userRepository, token);

  const profile = await this.profileRepository.getByUserId(user._id.toString());
  if (!profile) throw new CustomError(404, "Profile needed to comment");

  const comment = await this.commentRepository.getById(id);
  if (!comment) throw new CustomError(404, "Comment not found");

  if (profile.nickName === comment.authorNickName) {
    const deletedComment = await this.commentRepository.delete(id);
    return deletedComment;
  }

  const post = await PostRepository.getById(comment?.postId as string);
  if (post?.authorNickName === profile.nickName) {
    const deletedComment = await this.commentRepository.delete(id);
    return deletedComment;
  }

  throw new CustomError(401, "You dont have permission to delete this comment");
};
