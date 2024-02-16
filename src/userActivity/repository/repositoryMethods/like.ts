import { ObjectId } from "mongodb";
import { Mongo } from "../../../mongo";

export const like = async (
  postId: string,
  userEmail: string
): Promise<void> => {
  const user = await Mongo.users().findOne({ email: userEmail });

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
