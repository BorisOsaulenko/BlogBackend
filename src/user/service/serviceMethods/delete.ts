import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserService } from "../service";

export const deleteUser = async function (this: UserService, token?: string) {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  if (!user) throw new Error("Invalid credentials");
  await this.profileRepository.deleteByEmail(user.email);
  await this.userActivatityRepository.deleteByUserEmail(user.email);
  return this.userRepository.deleteByEmail(user.email);
};
