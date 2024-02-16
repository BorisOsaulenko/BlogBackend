import { Mongo } from "../../../mongo";

export const createById = async (userId: string): Promise<void> => {
  Mongo.userActivity().insertOne({
    userId,
    following: [],
    likedPosts: [],
    dislikedPosts: [],
  });
};
