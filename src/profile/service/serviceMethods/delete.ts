import { Mongo } from "../../../mongo";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileRepository } from "../../repository/profileRepository";

export const deleteProfile = async (token: string | undefined) => {
  const user = await validateAuthTokenSignature(token);
  return await profileRepository.deleteByEmail(user.email);
};
