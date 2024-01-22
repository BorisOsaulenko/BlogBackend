import { Mongo } from "../../../../mongo";
import { Profile } from "../../../profile";

export const getByName = async (name: string): Promise<Profile | null> => {
  return await Mongo.profiles().findOne(
    { name },
    {
      projection: { _id: 0 },
    }
  );
};
