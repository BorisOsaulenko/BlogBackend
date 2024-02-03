import { CustomError } from "../../../customError/error";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserRepository } from "../../repository/userRepository";

export const unfollow = async (profileName: string, token?: string) => {
  const user = await validateAuthTokenSignature(token);
  const profileToUnfollow = await ProfileRepository.getByNickName(profileName);
  if (!profileToUnfollow) throw new CustomError(400, "Profile not found");
  const userProfile = await ProfileRepository.getByEmail(user.email);
  if (profileToUnfollow.userId === userProfile?.userId) throw new CustomError(400, "You cannot unfollow yourself");

  return await UserRepository.unfollow(user.email, profileToUnfollow.nickName);
};
