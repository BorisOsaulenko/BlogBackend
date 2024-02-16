import { CustomError } from "../../../customError/error";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserActivityRepository } from "../../repository/repository";

export const toggleProfileFollow = async (
  profileId?: string,
  token?: string
): Promise<void> => {
  const tokenUser = await validateAuthTokenSignature(token);

  const profile = await ProfileRepository.getById(profileId);
  if (!profile) throw new CustomError(404, "Profile not found");

  const userActivity = await UserActivityRepository.getById(tokenUser.email);
  if (!userActivity) throw new CustomError(404, "UserActivity not found");

  if (
    // if already following -> unfollow
    userActivity.following.includes({
      nickName: profile.nickName,
      avatarURL: profile.avatarURL,
    })
  ) {
    UserActivityRepository.unfollow(profile.nickName, tokenUser.email);
  } else {
    // if not following -> follow
    UserActivityRepository.follow(profile.nickName, tokenUser.email);
  }
};
