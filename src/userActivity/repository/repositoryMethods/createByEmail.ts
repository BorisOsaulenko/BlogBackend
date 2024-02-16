import { Mongo } from "../../../mongo";

export const createByEmail = async (email: string): Promise<void> => {
  const user = await Mongo.users().findOne({ email });
  Mongo.userActivity().insertOne({
    userId: String(user?._id),
    following: [],
    likedPosts: [],
    dislikedPosts: [],
  });
};
