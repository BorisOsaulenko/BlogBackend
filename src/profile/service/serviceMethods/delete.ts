import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { ProfileRepository } from "../../repository/profileRepository";
import { ProfileService } from "../service";

export const deleteProfile = async function (
  this: ProfileService,
  token?: string
) {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  return await this.profileRepository.deleteByEmail(user.email);
};
