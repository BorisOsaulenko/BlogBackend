import { CustomError } from "../../../customError/error";
import { UserRepository } from "../../../user/repository/userRepository";
import { UserActivityRepository } from "../../repository/repository";

export const createByEmail = async (userEmail: string): Promise<void> => {
  if (!userEmail) {
    throw new CustomError(400, "UserEmail is required");
  }

  const user = await UserRepository.getByEmail(userEmail);
  if (!user) throw new CustomError(404, "User not found");

  const userActivity = await UserActivityRepository.getByEmail(userEmail);
  if (userActivity) throw new CustomError(409, "UserActivity already exists");

  UserActivityRepository.createByEmail(userEmail);
};
