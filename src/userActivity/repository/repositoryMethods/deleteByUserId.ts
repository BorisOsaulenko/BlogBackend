import { Mongo } from "../../../mongo";
import { UserActivityRepository } from "../repository";

export const deleteByUserId = async function (
  this: UserActivityRepository,
  userId: string
): Promise<void> {
  await Mongo.userActivity().deleteMany({ userId });
};
