import { ProfileRepository } from "../../repository/profileRepository";
import { ProfileService } from "../service";

export const get = async function (
  this: ProfileService,
  nickName?: string,
  email?: string
) {
  let profile;
  if (nickName) {
    profile = await this.profileRepository.getByNickName(nickName);
  } else if (email) {
    profile = await this.profileRepository.getByEmail(email);
  }

  if (!profile) throw new Error("Profile not found");
  const { userId, followers, ...publicPartOfProfile } = profile;
  return { ...publicPartOfProfile, followers: followers.length };
};
