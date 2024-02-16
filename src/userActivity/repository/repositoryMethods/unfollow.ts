import { Mongo } from "../../../mongo";

export const unfollow = async (
  nickName: string, // nickname of profile to be followed
  userEmail: string // who is following
): Promise<void> => {
  const profile = await Mongo.profiles().findOne({ nickName });
  const user = await Mongo.users().findOne({ email: userEmail });
  Mongo.userActivity().updateOne(
    { userId: String(user?._id) },
    {
      $pull: {
        following: {
          nickName: profile?.nickName as string, //checking for nulls in service layer
          avatarURL: profile?.avatarURL as string,
        },
      },
    }
  );
  Mongo.profiles().updateOne(
    { nickName },
    {
      $pull: {
        followers: userEmail,
      },
    }
  );
};
