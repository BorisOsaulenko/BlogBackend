import { Mongo } from "../../../mongo";
import { UserActivity } from "../../userActivity";

export const getById = async (id: string): Promise<UserActivity | null> => {
  return Mongo.userActivity().findOne(
    { userId: id },
    { projection: { userId: 0 } }
  );
};
