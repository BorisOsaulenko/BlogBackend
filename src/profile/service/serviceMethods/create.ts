import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser as profileFieldsProvidedByUser } from "../../profile";
import { ProfileRepository } from "../../repository/profileRepository";

export const create = async (
  profile: profileFieldsProvidedByUser,
  token?: string
) => {
  const user = await validateAuthTokenSignature(token);
  if (await ProfileRepository.getByEmail(user.email))
    throw new CustomError(409, "Profile already exists");

  await ProfileRepository.createByEmail(
    {
      ...profile,
      createdAt: Date.now(),
      followers: [],
      sponsors: [],
    },
    user.email
  );
};
