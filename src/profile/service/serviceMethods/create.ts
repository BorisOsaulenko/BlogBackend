import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../utils/checkCredentials";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser as profileFieldsProvidedByUser } from "../../profile";
import { getProfileByEmail } from "../../repository/getProfileByEmail";

export const create = async (
  token: string | undefined,
  profile: profileFieldsProvidedByUser
) => {
  const { email, password } = validateAuthTokenSignature(token);

  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(401, "User not found");
  if (await getProfileByEmail(email))
    throw new CustomError(409, "Profile already exists");
  const createdProfile = await Mongo.profiles().insertOne({
    ...profile,
    userId: String(user._id),
    createdAt: new Date(),
    followers: [],
    following: [],
  });
  return createdProfile;
};
