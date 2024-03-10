import { WithId } from "mongodb";
import { Mongo } from "../../../../mongo";
import { Profile } from "../../../profile";
import { ProfileRepository } from "../../profileRepository";

export const getByNickName = async function (
  this: ProfileRepository,
  nickName?: string
): Promise<WithId<Profile> | null> {
  return await Mongo.profiles().findOne({ nickName });
};
