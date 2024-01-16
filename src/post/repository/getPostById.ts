import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";

export const getPostById = async (id: string) => {
  const post = await Mongo.posts().findOne({ _id: new ObjectId(id) });
  return post;
};
