import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { Profile } from "../profile";
import { getById } from "./repoMethods/gets/byId";
import { getByNickName } from "./repoMethods/gets/byNickName";
import { getByEmail } from "./repoMethods/gets/byEmail";
import { update } from "./repoMethods/update";

export class ProfileRepository {
  public static getById = getById;
  public static getByNickName = getByNickName;
  public static getByEmail = getByEmail;
  public static update = update;

  public static async create(profile: Omit<Profile, "userId">, email: string): Promise<void> {
    const user = await Mongo.users().findOne({ email });
    await Mongo.profiles().insertOne({ ...profile, userId: String(user?._id) });
  }

  public static async deleteById(id: string): Promise<void> {
    await Mongo.profiles().deleteOne({ _id: new ObjectId(id) });
  }

  public static async deleteByNickName(nickName: string): Promise<void> {
    await Mongo.profiles().deleteOne({ nickName });
  }

  public static async deleteByEmail(email: string): Promise<void> {
    const user = await Mongo.users().findOne({ email });
    await Mongo.profiles().deleteOne({ userId: String(user?._id) });
  }
}
