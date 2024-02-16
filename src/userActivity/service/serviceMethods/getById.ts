import { CustomError } from "../../../customError/error";
import { UserRepository } from "../../../user/repository/userRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserActivityRepository } from "../../repository/repository";
import { UserActivity } from "../../userActivity";

export const getById = async (
  userId: string,
  token?: string
): Promise<UserActivity | null> => {
  if (!userId) {
    throw new CustomError(400, "UserId is required");
  }

  const tokenUser = await validateAuthTokenSignature(token);
  const idUser = await UserRepository.getById(userId);
  if (tokenUser.email !== idUser?.email)
    throw new CustomError(401, "Unauthorized");

  return UserActivityRepository.getById(userId);
};
