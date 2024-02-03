import { ProfileRepository } from "../../repository/profileRepository";

export const get = async (nickName?: string, email?: string) => {
  let profile;
  if (nickName) {
    profile = await ProfileRepository.getByNickName(nickName);
  } else if (email) {
    profile = await ProfileRepository.getByEmail(email);
  }

  if (!profile) throw new Error("Profile not found");
  const { userId, followers, ...publicPartOfProfile } = profile;
  return { ...publicPartOfProfile, followers: followers.length };
};
