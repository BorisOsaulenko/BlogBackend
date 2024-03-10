import { ObjectId } from "mongodb";
import { Mongo } from "../../../mongo";
import { UserActivityRepository } from "../repository";

export const deleteById = async function (
  this: UserActivityRepository,
  id: string
): Promise<void> {
  await Mongo.userActivities().deleteOne({ _id: new ObjectId(id) });
};
