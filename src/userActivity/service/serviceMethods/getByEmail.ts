import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserActivityRepository } from "../../repository/repository";
import { UserActivity } from "../../userActivity";

export const getByEmail = async (
  email: string,
  token?: string
): Promise<UserActivity | null> => {
  if (!email) {
    throw new CustomError(400, "UserEmail is required");
  }

  const user = await validateAuthTokenSignature(token);
  if (user.email !== email) throw new CustomError(401, "Unauthorized");

  return UserActivityRepository.getByEmail(email);
};
