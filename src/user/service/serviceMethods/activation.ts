import { CustomError } from "../../../customError/error";
import { UserRepository } from "../../repository/userRepository";

export const activation = async (code: string, email: string) => {
  const user = await UserRepository.getByEmail(email);
  if (!user) throw new CustomError(400, "User not found");
  if (user.activationNumber !== Number(code)) throw new CustomError(400, "Invalid activation code");

  await UserRepository.activation(email);
  return user;
};
