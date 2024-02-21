import { CustomError } from "../../../customError/error";
import { UserRepository } from "../../../user/repository/userRepository";
import { UserActivityRepository } from "../../repository/repository";
import { UserActivityService } from "../service";

export const createByEmail = async function (
  this: UserActivityService,
  userEmail: string
): Promise<void> {
  if (!userEmail) {
    throw new CustomError(400, "UserEmail is required");
  }

  const user = await this.userRepository.getByEmail(userEmail);
  if (!user) throw new CustomError(404, "User not found");

  const userActivity = await this.userActivityRepository.getByEmail(userEmail);
  if (userActivity) throw new CustomError(409, "UserActivity already exists");

  this.userActivityRepository.createByEmail(userEmail);
};
