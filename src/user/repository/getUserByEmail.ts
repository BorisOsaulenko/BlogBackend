import { Mongo } from "../../mongo";

export const getUserByEmail = async (email: string) => {
  const user = await Mongo.users().findOne({ email });
  return user;
};
