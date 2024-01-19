import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../utils/checkCredentials";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser } from "../../profile";
import { getProfileByEmail } from "../../repository/getProfileByEmail";

export const update = async (
  token: string | undefined,
  update: Partial<profileFieldsProvidedByUser>
) => {
  const { email, password } = validateAuthTokenSignature(token);
  const user = await checkCredentials(email, password);
  const profile = await getProfileByEmail(email);
  if (!profile) throw new CustomError(404, "Profile not found");

  await Mongo.posts().updateMany(
    { authorName: profile.name },
    {
      $set: {
        authorName: update.name || profile.name,
        authorAvatar: update.avatarURL || profile.avatarURL,
      },
    }
  );
  const updatedProfile = await Mongo.profiles().updateOne(
    { userId: String(user._id) },
    {
      $set: update,
    }
  );

  return updatedProfile;
};
