import { Mongo } from "../../mongo";
import { ObjectId } from "mongodb";

export const getUserById = async (id: string) => {
  const user = await Mongo.users().findOne({ _id: new ObjectId(id) });
  return user;
};
