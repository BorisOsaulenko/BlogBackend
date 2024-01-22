import { Mongo } from "../../../mongo";
import { postFieldsProvidedByUser } from "../../post";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileRepository } from "../../../profile/repository/profileRepository";
import { CustomError } from "../../../customError/error";

export const create = async (
  token: string | undefined,
  post: postFieldsProvidedByUser
) => {
  const user = await validateAuthTokenSignature(token);

  const profile = await profileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  return await Mongo.posts().insertOne({
    ...post,
    authorName: profile.nickName,
    authorAvatar: profile.avatarURL,
    posted: Date.now(),
    views: 0,
    likes: [],
  });
};
