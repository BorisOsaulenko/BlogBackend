import { Mongo } from "../../../mongo";
import { UserActivityRepository } from "../repository";

export const deleteByUserEmail = async function (
  this: UserActivityRepository,
  email: string
): Promise<void> {
  const user = await this.userRepository.getByEmail(email);
  await Mongo.userActivity().deleteOne({ userId: user?._id.toString() });
};
