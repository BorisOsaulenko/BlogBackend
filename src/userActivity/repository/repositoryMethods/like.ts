import { ObjectId } from "mongodb";
import { Mongo } from "../../../mongo";
import { UserActivityRepository } from "../repository";

export const like = async function (
  this: UserActivityRepository,
  postId: string,
  userEmail: string
): Promise<void> {
  const user = await this.userRepository.getByEmail(userEmail);

  Mongo.userActivity().updateOne(
    { userId: String(user?._id) },
    {
      $push: {
        likedPosts: postId,
      },
      $pull: {
        dislikedPosts: postId,
      },
    }
  );

  Mongo.posts().updateOne(
    { _id: new ObjectId(postId) },
    {
      $push: {
        likes: userEmail,
      },
      $pull: {
        dislikes: userEmail,
      },
    }
  );
};
