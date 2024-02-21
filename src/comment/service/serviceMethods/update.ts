import { ObjectId } from "mongodb";
import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { CommentRepository } from "../../repository/commentRepository";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { CommentService } from "../service";

export const update = async function (
  this: CommentService,
  id: string,
  content: string,
  token?: string
) {
  if (!content) throw new CustomError(400, "Content is required");

  const user = await validateAuthTokenSignature(this.userRepository, token);
  const profile = await this.profileRepository.getByEmail(user.email);
  const comment = await this.commentRepository.getById(id);
  if (!comment) throw new CustomError(404, "Comment not found");
  if (!profile) throw new CustomError(404, "Profile needed to comment");

  if (comment.authorNickName !== profile.nickName)
    throw new CustomError(
      401,
      "You dont have permission to update this comment"
    );
  const updatedComment = await this.commentRepository.update(id, {
    content,
  });

  return updatedComment;
};
