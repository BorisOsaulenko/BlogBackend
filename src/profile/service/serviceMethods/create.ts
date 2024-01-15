import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../user/utils/checkCredentials";
import {
  Profile,
  profileFieldsProvidedByUser as profileFieldsProvidedByUser,
} from "../../profile";
import { getProfileByEmail } from "../../repository/getProfileByEmail";

export const create = async (
  email: string,
  password: string,
  profile: profileFieldsProvidedByUser
) => {
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
