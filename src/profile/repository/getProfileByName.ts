import { Mongo } from "../../mongo";

export const getProfileByName = async (name: string) => {
  const profile = await Mongo.profiles().findOne({ name });
  return profile;
};
