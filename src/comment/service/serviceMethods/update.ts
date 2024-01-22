import { ObjectId } from "mongodb";
import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { CommentRepository } from "../../repository/comment";
import { profileRepository } from "../../../profile/repository/profileRepository";

export const update = async (id: string, content: string, token?: string) => {
  if (!content) throw new CustomError(400, "Content is required");

  const user = await validateAuthTokenSignature(token);
  const profile = await profileRepository.getByEmail(user.email);
  const comment = await CommentRepository.getCommentById(id);
  if (!comment) throw new CustomError(404, "Comment not found");
  if (!profile) throw new CustomError(404, "Profile needed to comment");

  if (comment.authorName !== profile.nickName)
    throw new CustomError(
      401,
      "You dont have permission to update this comment"
    );
  const updatedComment = await Mongo.comments().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        content,
      },
    }
  );

  return comment;
};
