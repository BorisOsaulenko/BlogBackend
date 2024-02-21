import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserActivityRepository } from "../../repository/repository";
import { UserActivity } from "../../userActivity";
import { UserActivityService } from "../service";

export const getByEmail = async function (
  this: UserActivityService,
  email: string,
  token?: string
): Promise<UserActivity | null> {
  if (!email) {
    throw new CustomError(400, "UserEmail is required");
  }

  const user = await validateAuthTokenSignature(this.userRepository, token);
  if (user.email !== email) throw new CustomError(401, "Unauthorized");

  return this.userActivityRepository.getByEmail(email);
};
