import { Db, Document, MongoClient } from "mongodb";
import { User } from "./user/user";
import { Profile } from "./profile/profile";
import { Post } from "./post/post";

const users = "users";
const profiles = "profiles";
const posts = "posts";

export class Mongo {
  public static mongo: Db;

  public static connect(url: string): Promise<Db> {
    return MongoClient.connect(url).then((c) => (this.mongo = c.db()));
  }
  public static users = () => Mongo.collection<User>(users);
  public static profiles = () => Mongo.collection<Profile>(profiles);
  public static posts = () => Mongo.collection<Post>(posts); // todo: change to post interface
  private static collection = <T extends Document>(name: string) =>
    Mongo.mongo.collection<T>(name);
}
