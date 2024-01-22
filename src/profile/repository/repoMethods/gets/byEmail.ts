import { Mongo } from "../../../../mongo";
import { Profile } from "../../../profile";

export const getByEmail = async (email: string): Promise<Profile | null> => {
  const user = await Mongo.users().findOne({ email });
  return await Mongo.profiles().findOne(
    { userId: String(user?._id) },
    {
      projection: { _id: 0 },
    }
  );
};
