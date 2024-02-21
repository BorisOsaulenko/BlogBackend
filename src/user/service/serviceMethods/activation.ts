import { CustomError } from "../../../customError/error";
import { UserService } from "../service";

export const activation = async function (
  this: UserService,
  code: string,
  email: string
) {
  const user = await this.userRepository.getByEmail(email);
  if (!user) throw new CustomError(400, "User not found");
  if (user.activationNumber !== Number(code))
    throw new CustomError(400, "Invalid activation code");

  await this.userRepository.activateByEmail(email);
  return user;
};
