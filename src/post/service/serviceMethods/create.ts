import { Mongo } from "../../../mongo";
import { postFieldsProvidedByUser } from "../../post";
import { checkCredentials } from "../../../utils/checkCredentials";
import { CustomError } from "../../../customError/error";
import { getProfileByEmail } from "../../../profile/repository/getProfileByEmail";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";

export const create = async (
  token: string | undefined,
  post: postFieldsProvidedByUser
) => {
  const { email, password } = validateAuthTokenSignature(token);
  const user = await checkCredentials(email, password);
  const profile = await getProfileByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  return await Mongo.posts().insertOne({
    ...post,
    authorName: profile.name,
    authorAvatar: profile.avatarURL,
    posted: new Date(),
    views: 0,
    likes: [],
    comments: [],
  });
};
