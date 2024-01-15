import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { User } from "../../user";
import { checkDoesUserExists } from "../../utils/checkDoesUserExists";

export const register = async (user: User) => {
  return await Mongo.users().insertOne(user);
};
