import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserService } from "../service";

export const deleteUser = async function (this: UserService, token?: string) {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  if (!user) throw new Error("Invalid credentials");
  const profile = await this.profileRepository.getByUserId(user._id.toString());
  if (profile) await this.profileRepository.deleteById(profile._id.toString());
  await this.userActivatityRepository.deleteByUserId(user._id.toString());
  return this.userRepository.deleteByEmail(user.email);
};