import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";

export const getUserByProfileName = async (name: string) => {
  const profile = await Mongo.profiles().findOne({ name });

  return await Mongo.users().findOne({ _id: new ObjectId(profile?.userId) });
};
