import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser as profileFieldsProvidedByUser } from "../../profile";
import { profileRepository } from "../../repository/profileRepository";

export const create = async (
  token: string | undefined,
  profile: profileFieldsProvidedByUser
) => {
  const user = await validateAuthTokenSignature(token);
  if (await profileRepository.getByEmail(user.email))
    throw new CustomError(409, "Profile already exists");

  const createdProfile = await profileRepository.create(
    {
      ...profile,
      createdAt: Date.now(),
      followers: [],
      following: [],
    },
    user.email
  );
  return createdProfile;
};
