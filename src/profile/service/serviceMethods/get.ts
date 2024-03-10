import { ProfileService } from "../service";

export const get = async function (this: ProfileService, nickName: string) {
  let profile;
  profile = await this.profileRepository.getByNickName(nickName);

  if (!profile) throw new Error("Profile not found");
  const { userId, followers, ...publicPartOfProfile } = profile;
  return { ...publicPartOfProfile, followers: followers.length };
};
