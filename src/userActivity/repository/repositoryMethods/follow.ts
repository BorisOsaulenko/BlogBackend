import { Mongo } from "../../../mongo";
import { Profile } from "../../../profile/profile";
import { UserActivityRepository } from "../repository";

export const follow = async function (
  this: UserActivityRepository,
  profileToFollow: Profile,
  userId: string
): Promise<void> {
  await Mongo.userActivities().updateOne(
    { userId },
    {
      $push: {
        following: {
          nickName: profileToFollow.nickName,
          avatarURL: profileToFollow.avatarURL,
        },
      },
    }
  );
};
