import { Mongo } from "../../../mongo";
import { User } from "../../user";

export const register = async (user: User) => {
  return await Mongo.users().insertOne(user);
};
