import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser as profileFieldsProvidedByUser } from "../../profile";
import { ProfileRepository } from "../../repository/profileRepository";
import { ProfileService } from "../service";

export const create = async function (
  this: ProfileService,
  profile: profileFieldsProvidedByUser,
  token?: string
) {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  if (await this.profileRepository.getByEmail(user.email))
    throw new CustomError(409, "Profile already exists");

  await this.profileRepository.createByEmail(
    {
      ...profile,
      createdAt: Date.now(),
      followers: [],
      sponsors: [],
    },
    user.email
  );
};
