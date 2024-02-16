import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { User } from "../user";

export class UserRepository {
  static async create(user: User): Promise<void> {
    await Mongo.users().insertOne(user);
  }

  static async getById(id: string): Promise<User | null> {
    return await Mongo.users().findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 0 } }
    );
  }

  static async getByEmail(email: string): Promise<User | null> {
    return await Mongo.users().findOne({ email }, { projection: { _id: 0 } });
  }

  static async getByProfileName(name: string): Promise<User | null> {
    const profile = await Mongo.profiles().findOne({ name });
    return await Mongo.users().findOne(
      { _id: new ObjectId(profile?.userId) },
      { projection: { _id: 0 } }
    );
  }

  static async updateByEmail(
    email: string,
    user: Partial<User>
  ): Promise<void> {
    await Mongo.users().updateOne({ email }, { $set: user });
  }

  static async updateById(id: string, user: Partial<User>): Promise<void> {
    await Mongo.users().updateOne({ _id: new ObjectId(id) }, { $set: user });
  }

  public static async follow(email: string, nickName: string): Promise<void> {
    const profile = await Mongo.profiles().findOneAndUpdate(
      { nickName },
      { $push: { followers: email } },
      { returnDocument: "after" }
    );
    await Mongo.users().updateOne(
      { email },
      {
        $push: { following: { nickName, avatarURL: profile.value!.avatarURL } },
      }
    );
    return;
  }

  public static async unfollow(email: string, nickName: string): Promise<void> {
    const profile = await Mongo.profiles().findOneAndUpdate(
      { nickName },
      { $pull: { followers: email } },
      { returnDocument: "after" }
    );
    await Mongo.users().updateOne(
      { email },
      {
        $pull: { following: { nickName, avatarURL: profile.value!.avatarURL } },
      }
    );
  }

  static async activation(email: string): Promise<void> {
    await Mongo.users().updateOne({ email }, { $set: { isActive: true } });
  }

  public static async likePost(email: string, postId: string): Promise<void> {
    await Mongo.posts().updateOne(
      { _id: new ObjectId(postId) },
      { $push: { likes: email } }
    );
    await Mongo.users().updateOne({ email }, { $push: { likedPosts: postId } });
  }

  public static async unlikePost(email: string, postId: string): Promise<void> {
    await Mongo.posts().updateOne(
      { _id: new ObjectId(postId) },
      { $pull: { likes: email } }
    );
    await Mongo.users().updateOne({ email }, { $pull: { likedPosts: postId } });
  }

  static async deleteById(id: string): Promise<void> {
    await Mongo.users().deleteOne({ _id: new ObjectId(id) });
  }

  static async deleteByEmail(email: string): Promise<void> {
    await Mongo.users().deleteOne({ email });
  }
}
