import { ObjectId } from "mongodb";
import { Mongo } from "../../../mongo";
import { UserActivity } from "../../userActivity";
import { UserActivityRepository } from "../repository";

export const getById = async function (
  this: UserActivityRepository,
  id: string
): Promise<UserActivity | null> {
  return await Mongo.userActivities().findOne({ _id: new ObjectId(id) });
};
