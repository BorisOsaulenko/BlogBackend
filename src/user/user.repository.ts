import { userInfo } from "os";
import { Mongo } from "../mongo";
import { ObjectId } from "mongodb";

export class UserRepo {
  public static async getUserById(id: ObjectId) {
    const user = await Mongo.users().findOne({ _id: id });

    return user;
  }

  public static async getUserByEmail(email: string) {
    const user = await Mongo.users().findOne({ email: email });

    return user;
  }
}
