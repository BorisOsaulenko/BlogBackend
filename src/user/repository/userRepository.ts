import { ObjectId, WithId } from "mongodb";
import { Mongo } from "../../mongo";
import { User } from "../user";

export class UserRepository {
  constructor() {}
  async create(user: User): Promise<void> {
    await Mongo.users().insertOne(user);
  }

  async getById(id: string): Promise<WithId<User> | null> {
    return await Mongo.users().findOne({ _id: new ObjectId(id) });
  }

  async getByEmail(email: string): Promise<WithId<User> | null> {
    return await Mongo.users().findOne({ email });
  }

  async updateByEmail(email: string, user: Partial<User>): Promise<void> {
    await Mongo.users().updateOne({ email }, { $set: user });
  }

  async updateById(id: string, user: Partial<User>): Promise<void> {
    await Mongo.users().updateOne({ _id: new ObjectId(id) }, { $set: user });
  }

  async activateByEmail(email: string): Promise<void> {
    await Mongo.users().updateOne({ email }, { $set: { isActive: true } });
  }

  async activateById(id: string): Promise<void> {
    await Mongo.users().updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive: true } }
    );
  }

  async deleteById(id: string): Promise<void> {
    await Mongo.users().deleteOne({ _id: new ObjectId(id) });
  }

  async deleteByEmail(email: string): Promise<void> {
    await Mongo.users().deleteOne({ email });
  }
}
