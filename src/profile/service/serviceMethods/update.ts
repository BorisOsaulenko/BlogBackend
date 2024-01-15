import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../user/utils/checkCredentials";
import { profileFieldsProvidedByUser } from "../../profile";

export const update = async (
  email: string,
  password: string,
  profile: Partial<profileFieldsProvidedByUser>
) => {
  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(401, "User not found");
  const updatedProfile = await Mongo.profiles().updateOne(
    { userId: String(user._id) },
    {
      $set: profile,
    }
  );
  return updatedProfile;
};
