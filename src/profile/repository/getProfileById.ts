import { Mongo } from "../../mongo";

export const getProfileById = async (id: string) => {
  const profile = await Mongo.profiles().findOne({ userId: id });
  return profile;
};
