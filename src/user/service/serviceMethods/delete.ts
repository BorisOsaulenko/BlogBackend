import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserRepository } from "../../repository/userRepository";

export const deleteUser = async (token: string) => {
  const user = await validateAuthTokenSignature(token);
  if (!user) throw new Error("Invalid credentials");
  await ProfileRepository.deleteByEmail(user.email);
  return UserRepository.deleteByEmail(user.email);
};
