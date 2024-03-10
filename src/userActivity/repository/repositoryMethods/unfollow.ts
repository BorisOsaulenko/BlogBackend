import { Mongo } from "../../../mongo";
import { Profile } from "../../../profile/profile";
import { UserActivityRepository } from "../repository";

export const unfollow = async function (
  this: UserActivityRepository,
  profileToUnfollow: Profile,
  userId: string
): Promise<void> {
  await Mongo.userActivities().updateOne(
    { userId },
    {
      $pull: {
        following: {
          nickName: profileToUnfollow.nickName,
          avatarURL: profileToUnfollow.avatarURL,
        },
      },
    }
  );
};
