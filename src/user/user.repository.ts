import { userInfo } from "os";
import { Mongo } from "../mongo";

export class UserRepo {
  public static async getUserById(id: number) {
    const user = await Mongo.users().findOne({ id: id });

    return user;
  }

  public static async getUserByEmail(email: string) {
    const user = await Mongo.users().findOne({ email: email });

    return user;
  }
}
