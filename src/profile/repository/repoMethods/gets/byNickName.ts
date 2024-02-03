import { Mongo } from "../../../../mongo";
import { Profile } from "../../../profile";

export const getByNickName = async (nickName: string): Promise<Profile | null> => {
  return await Mongo.profiles().findOne(
    { nickName },
    {
      projection: { _id: 0 },
    }
  );
};
