import { Mongo } from "../../../mongo";
import { UserActivity } from "../../userActivity";

export const getByEmail = async (
  email: string
): Promise<UserActivity | null> => {
  const user = await Mongo.users().findOne({ email });
  return Mongo.userActivity().findOne({ userId: String(user?._id) });
};
