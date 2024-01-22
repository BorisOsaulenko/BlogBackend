import { ObjectId } from "mongodb";
import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { CommentRepository } from "../../repository/comment";
import { profileRepository } from "../../../profile/repository/profileRepository";

export const deleteComment = async (id: string, token?: string) => {
  const user = await validateAuthTokenSignature(token);
  const profile = await profileRepository.getByEmail(user.email);
  const comment = await CommentRepository.getCommentById(id);
  if (!profile) throw new CustomError(404, "Profile needed to comment");
  if (!comment) throw new CustomError(404, "Comment not found");
  if (profile.nickName !== comment.authorName)
    throw new CustomError(
      401,
      "You dont have permission to delete this comment"
    );

  const deletedComment = await Mongo.comments().deleteOne({
    _id: new ObjectId(id),
  });
  return deleteComment;
};
