import { CustomError } from "../../../customError/error";
import { UserRepository } from "../../../user/repository/userRepository";
import { UserActivityRepository } from "../../repository/repository";

export const createById = async (userId: string): Promise<void> => {
  if (!userId) {
    throw new CustomError(400, "UserEmail is required");
  }

  const user = await UserRepository.getById(userId);
  if (!user) throw new CustomError(404, "User not found");

  const userActivity = await UserActivityRepository.getById(userId);
  if (userActivity) throw new CustomError(409, "UserActivity already exists");

  UserActivityRepository.createById(userId);
};
