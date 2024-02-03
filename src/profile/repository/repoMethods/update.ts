import { Mongo } from "../../../mongo";
import { Profile, profileFieldsProvidedByUser } from "../../profile";

export const update = async (nickName: string, profile: Partial<profileFieldsProvidedByUser>): Promise<void> => {
  const previousProfile = (await Mongo.profiles().findOne({ nickName })) as Profile;

  if (profile.nickName || profile.avatarURL) {
    await Mongo.posts().updateMany(
      { authorNickName: previousProfile?.nickName },
      {
        $set: {
          authorNickName: profile.nickName || previousProfile?.nickName,
          authorAvatar: profile.avatarURL || previousProfile?.avatarURL,
        },
      }
    );

    //update every user who is following profile:
    Mongo.users().updateMany(
      {
        following: {
          $elemMatch: {
            nickName: previousProfile.nickName,
          },
        },
      },
      {
        $set: {
          "following.$.nickName": profile.nickName || previousProfile?.nickName,
          "following.$.avatarURL": profile.avatarURL || previousProfile?.avatarURL,
        },
      }
    );
  }
  await Mongo.profiles().updateOne({ nickName }, { $set: profile });
};
