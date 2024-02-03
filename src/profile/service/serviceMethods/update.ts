import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser } from "../../profile";
import { ProfileRepository } from "../../repository/profileRepository";

export const update = async (update: Partial<profileFieldsProvidedByUser>, token?: string) => {
  const user = await validateAuthTokenSignature(token);
  const profile = await ProfileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  const updatedProfile = await ProfileRepository.update(profile.nickName, update);

  return updatedProfile;
};
