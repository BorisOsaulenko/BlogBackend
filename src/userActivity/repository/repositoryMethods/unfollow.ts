import { Mongo } from "../../../mongo";
import { UserActivityRepository } from "../repository";

export const unfollow = async function (
  this: UserActivityRepository,
  nickName: string, // nickname of profile to be followed
  userEmail: string // who is following
): Promise<void> {
  const profile = await this.profileRepository.getByNickName(nickName);
  const user = await this.userRepository.getByEmail(userEmail);
  Mongo.userActivity().updateOne(
    { userId: String(user?._id) },
    {
      $pull: {
        following: {
          nickName: profile?.nickName, //checking for nulls in service layer
          avatarURL: profile?.avatarURL,
        },
      },
    }
  );
  this.profileRepository.removeFollower(nickName, userEmail);
};
