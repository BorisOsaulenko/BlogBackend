import { ObjectId } from "mongodb";
import { Mongo } from "../../../mongo";

export const removeLikeSign = async (
  postId: string,
  userEmail: string
): Promise<void> => {
  const user = await Mongo.users().findOne({ email: userEmail });

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
