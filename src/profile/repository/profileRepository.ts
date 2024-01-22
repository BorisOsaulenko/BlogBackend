import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { Profile, profileFieldsProvidedByUser } from "../profile";
import { getById } from "./repoMethods/gets/byId";
import { getByName } from "./repoMethods/gets/byName";
import { getByEmail } from "./repoMethods/gets/byEmail";
import { update } from "./repoMethods/update";

export class profileRepository {
  public static async getById(id: string): Promise<Profile | null> {
    return await getById(id);
  }

  public static async getByName(name: string): Promise<Profile | null> {
    return await getByName(name);
  }

  public static async getByEmail(email: string): Promise<Profile | null> {
    return await getByEmail(email);
  }

  public static async create(
    profile: Omit<Profile, "userId">,
    email: string
  ): Promise<void> {
    const user = await Mongo.users().findOne({ email });
    await Mongo.profiles().insertOne({ ...profile, userId: String(user?._id) });
  }

  public static async update(
    email: string,
    profile: Partial<profileFieldsProvidedByUser>
  ): Promise<void> {
    return await update(email, profile);
  }

  public static async deleteById(id: string): Promise<void> {
    await Mongo.profiles().deleteOne({ _id: new ObjectId(id) });
  }

  public static async deleteByName(name: string): Promise<void> {
    await Mongo.profiles().deleteOne({ name });
  }

  public static async deleteByEmail(email: string): Promise<void> {
    const user = await Mongo.users().findOne({ email });
    await Mongo.profiles().deleteOne({ userId: String(user?._id) });
  }
}
