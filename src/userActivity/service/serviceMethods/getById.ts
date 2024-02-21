import { CustomError } from "../../../customError/error";
import { UserRepository } from "../../../user/repository/userRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserActivityRepository } from "../../repository/repository";
import { UserActivity } from "../../userActivity";
import { UserActivityService } from "../service";

export const getById = async function (
  this: UserActivityService,
  userId: string,
  token?: string
): Promise<UserActivity | null> {
  if (!userId) {
    throw new CustomError(400, "UserId is required");
  }

  const tokenUser = await validateAuthTokenSignature(
    this.userRepository,
    token
  );
  const idUser = await this.userRepository.getById(userId);
  if (tokenUser.email !== idUser?.email)
    throw new CustomError(401, "Unauthorized");

  return this.userActivityRepository.getById(userId);
};
