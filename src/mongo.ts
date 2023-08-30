import { Db, Document, MongoClient } from "mongodb";
import { User } from "./user/user";
import { Post } from "./post/post";
import { Tag } from "./Tag/tag";

const users = "Users";
const posts = "Posts";
const tags = "Tags";

export class Mongo {
  public static mongo: Db;

  public static connect(url: string): Promise<Db> {
    return MongoClient.connect(url).then((c) => (this.mongo = c.db()));
  }
  public static users = () => Mongo.collection<User>(users);
  public static posts = () => Mongo.collection<Post>(posts);
  public static tags = () => Mongo.collection<Tag>(tags);
  private static collection = <T extends Document>(name: string) =>
    Mongo.mongo.collection<T>(name);
}
