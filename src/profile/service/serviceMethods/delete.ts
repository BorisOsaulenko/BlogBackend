import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { ProfileRepository } from "../../repository/profileRepository";

export const deleteProfile = async (token: string | undefined) => {
  const user = await validateAuthTokenSignature(token);
  return await ProfileRepository.deleteByEmail(user.email);
};
