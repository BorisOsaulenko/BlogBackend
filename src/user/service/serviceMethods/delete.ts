import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../utils/checkCredentials";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";

export const deleteUser = async (token: string) => {
  const { email, password } = validateAuthTokenSignature(token);
  const user = await checkCredentials(email, password);
  if (!user) throw new Error("Invalid credentials");
  await Mongo.profiles().deleteOne({ userId: String(user._id) });
  return await Mongo.users().deleteOne({ email, password });
};
