import { Mongo } from "../../mongo";
import { getUserByEmail } from "../../user/repository/getUserByEmail";
import { CustomError } from "../../customError/error";

export const getProfileByEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new CustomError(404, "User not found");
  return await Mongo.profiles().findOne({ userId: String(user._id) });
};
