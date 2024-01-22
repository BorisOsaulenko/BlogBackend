import { Mongo } from "../../../mongo";
import { profileFieldsProvidedByUser } from "../../profile";

export const update = async (
  email: string,
  profile: Partial<profileFieldsProvidedByUser>
): Promise<void> => {
  const user = await Mongo.users().findOne({ email });
  const previousProfile = await Mongo.profiles().findOne({
    userId: String(user?._id),
  });
  if (profile.nickName || profile.avatarURL) {
    await Mongo.posts().updateMany(
      { authorName: previousProfile?.nickName },
      {
        $set: {
          authorName: profile.nickName || previousProfile?.nickName,
          authorAvatar: profile.avatarURL || previousProfile?.avatarURL,
        },
      }
    );
  }
  await Mongo.profiles().updateOne(
    { userId: String(user?._id) },
    { $set: profile }
  );
};
