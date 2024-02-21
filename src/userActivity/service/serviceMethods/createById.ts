import { CustomError } from "../../../customError/error";
import { UserActivityRepository } from "../../repository/repository";
import { UserActivityService } from "../service";

export const createById = async function (
  this: UserActivityService,
  userId: string
): Promise<void> {
  if (!userId) {
    throw new CustomError(400, "UserEmail is required");
  }

  const user = await this.userRepository.getById(userId);
  if (!user) throw new CustomError(404, "User not found");

  const userActivity = await this.userActivityRepository.getById(userId);
  if (userActivity) throw new CustomError(409, "UserActivity already exists");

  this.userActivityRepository.createById(userId);
};
