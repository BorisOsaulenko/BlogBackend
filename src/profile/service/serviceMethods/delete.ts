import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../user/utils/checkCredentials";

export const deleteProfile = async (email: string, password: string) => {
  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(401, "User not found");
  return Mongo.profiles().deleteOne({ userId: String(user._id) });
};
