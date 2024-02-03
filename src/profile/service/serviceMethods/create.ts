import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser as profileFieldsProvidedByUser } from "../../profile";
import { ProfileRepository } from "../../repository/profileRepository";

export const create = async (token: string | undefined, profile: profileFieldsProvidedByUser) => {
  const user = await validateAuthTokenSignature(token);
  if (await ProfileRepository.getByEmail(user.email)) throw new CustomError(409, "Profile already exists");

  const createdProfile = await ProfileRepository.create(
    {
      ...profile,
      createdAt: Date.now(),
      followers: [],
    },
    user.email
  );
  return createdProfile;
};
