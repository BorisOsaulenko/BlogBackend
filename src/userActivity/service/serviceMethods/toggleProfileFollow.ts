import { CustomError } from "../../../customError/error";
import { ProfileRepository } from "../../../profile/repository/profileRepository";
import { UserRepository } from "../../../user/repository/userRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserActivityRepository } from "../../repository/repository";
import { UserActivityService } from "../service";

export const toggleProfileFollow = async function (
  this: UserActivityService,
  profileId: string,
  token?: string
): Promise<void> {
  const tokenUser = await validateAuthTokenSignature(
    this.userRepository,
    token
  );

  const profile = await this.profileRepository.getById(profileId);
  if (!profile) throw new CustomError(404, "Profile not found");

  const userActivity = await this.userActivityRepository.getById(
    tokenUser.email
  );
  if (!userActivity) throw new CustomError(404, "UserActivity not found");

  if (
    // if already following -> unfollow
    userActivity.following.includes({
      nickName: profile.nickName,
      avatarURL: profile.avatarURL,
    })
  ) {
    this.userActivityRepository.unfollow(profile.nickName, tokenUser.email);
  } else {
    // if not following -> follow
    this.userActivityRepository.follow(profile.nickName, tokenUser.email);
  }
};
