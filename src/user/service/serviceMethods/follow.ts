import { CustomError } from "../../../customError/error";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserRepository } from "../../repository/userRepository";

export const follow = async (profileNickName: string, token?: string) => {
  const user = await validateAuthTokenSignature(token);
  const profileToFollow = await ProfileRepository.getByNickName(profileNickName);
  if (!profileToFollow) throw new CustomError(400, "Profile not found");
  const userProfile = await ProfileRepository.getByEmail(user.email);
  if (profileToFollow.userId === userProfile?.userId) throw new CustomError(400, "You cannot follow yourself");
  if (profileToFollow.followers.includes(user.email))
    throw new CustomError(400, "You are already following this profile");

  return await UserRepository.follow(user.email, profileToFollow.nickName);
};
