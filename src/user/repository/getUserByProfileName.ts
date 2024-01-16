import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { CustomError } from "../../customError/error";

export const getUserByProfileName = async (name: string) => {
  const profile = await Mongo.profiles().findOne({ name });
  if (!profile) throw new CustomError(404, "Profile with this name not found");

  return await Mongo.users().findOne({ _id: new ObjectId(profile.userId) });
};
