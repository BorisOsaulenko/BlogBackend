import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { User } from "../user";

export class UserRepository {
  static async create(user: User): Promise<void> {
    await Mongo.users().insertOne(user);
  }

  static async getById(id: string): Promise<User | null> {
    return await Mongo.users().findOne({ _id: new ObjectId(id) });
  }

  static async getByEmail(email: string): Promise<User | null> {
    return await Mongo.users().findOne({ email });
  }

  static async getByProfileName(name: string): Promise<User | null> {
    const profile = await Mongo.profiles().findOne({ name });
    return await Mongo.users().findOne({ _id: new ObjectId(profile?.userId) });
  }

  static async update(id: string, user: User): Promise<void> {
    await Mongo.users().updateOne({ _id: new ObjectId(id) }, { $set: user });
  }

  static async updateByFields(
    id: string,
    fields: Partial<User>
  ): Promise<void> {
    await Mongo.users().updateOne({ _id: new ObjectId(id) }, { $set: fields });
  }

  static async deleteById(id: string): Promise<void> {
    await Mongo.users().deleteOne({ _id: new ObjectId(id) });
  }

  static async deleteByEmail(email: string): Promise<void> {
    await Mongo.users().deleteOne({ email });
  }
}
