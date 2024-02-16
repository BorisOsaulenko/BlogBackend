import { ObjectId } from "mongodb";
import { Mongo } from "../../../../mongo";
import { Profile } from "../../../profile";

export const getById = async (id?: string): Promise<Profile | null> => {
  return await Mongo.profiles().findOne(
    { _id: new ObjectId(id) },
    { projection: { userId: 0 } }
  );
};
