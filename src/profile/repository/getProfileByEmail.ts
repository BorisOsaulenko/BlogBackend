import { Mongo } from "../../mongo";
import { getUserByEmail } from "../../user/repository/getUserByEmail";

export const getProfileByEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) return null;
  return await Mongo.profiles().findOne({ userId: String(user._id) });
};
