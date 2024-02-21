import { ObjectId } from "mongodb";
import { Mongo } from "../../../mongo";
import { UserActivityRepository } from "../repository";

export const removeLikeSign = async function (
  this: UserActivityRepository,
  postId: string,
  userEmail: string
): Promise<void> {
  const user = await this.userRepository.getByEmail(userEmail);

  Mongo.userActivity().updateOne(
    { userId: String(user?._id) },
    {
      $pull: {
        likedPosts: postId,
        dislikedPosts: postId,
      },
    }
  );

  Mongo.posts().updateOne(
    { _id: new ObjectId(postId) },
    {
      $pull: {
        likes: userEmail,
        dislikes: userEmail,
      },
    }
  );
};
