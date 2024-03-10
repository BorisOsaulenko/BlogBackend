import { ObjectId } from "mongodb";
import { Mongo } from "../../../../mongo";
import { Profile } from "../../../profile";
import { ProfileRepository } from "../../profileRepository";

export const getById = async function (
  this: ProfileRepository,
  id?: string
): Promise<Profile | null> {
  return await Mongo.profiles().findOne({ _id: new ObjectId(id) });
};
