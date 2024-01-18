import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../utils/checkCredentials";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";

export const deleteProfile = async (token: string | undefined) => {
  const { email, password } = validateAuthTokenSignature(token);
  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(401, "User not found");
  return Mongo.profiles().deleteOne({ userId: String(user._id) });
};
