import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileFieldsProvidedByUser } from "../../profile";
import { profileRepository } from "../../repository/profileRepository";

export const update = async (
  token: string | undefined,
  update: Partial<profileFieldsProvidedByUser>
) => {
  const user = await validateAuthTokenSignature(token);
  const profile = await profileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  const updatedProfile = await profileRepository.update(user.email, update);

  return updatedProfile;
};
