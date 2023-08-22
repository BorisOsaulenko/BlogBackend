import { Db, Document, MongoClient } from "mongodb";
import { User } from "./user/user";

const users = "Users";

export class Mongo {
  public static mongo: Db;

  public static connect(url: string): Promise<Db> {
    return MongoClient.connect(url).then((c) => (this.mongo = c.db()));
  }
  public static users = () => Mongo.collection<User>(users);
  private static collection = <T extends Document>(name: string) =>
    Mongo.mongo.collection<T>(name);
}
