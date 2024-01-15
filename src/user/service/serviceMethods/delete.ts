import { Mongo } from "../../../mongo";
export const deleteUser = async (email: string, password: string) => {
  return await Mongo.users().deleteOne({ email, password });
};
