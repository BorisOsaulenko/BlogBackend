import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser } from "../../profile";
import { ProfileRepository } from "../../repository/profileRepository";
import { ProfileService } from "../service";

export const update = async function (
  this: ProfileService,
  update: Partial<profileFieldsProvidedByUser>,
  token?: string
) {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  const profile = await this.profileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  const updatedProfile = await this.profileRepository.update(
    profile.nickName,
    update
  );

  return updatedProfile;
};
