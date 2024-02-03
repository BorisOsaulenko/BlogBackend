import { CustomError } from "../customError/error";
import { UserRepository } from "../user/repository/userRepository";
import bcrypt from "bcrypt";

export const checkCredentials = async (email: string, password: string) => {
  const user = await UserRepository.getByEmail(email);
  if (!user?.isActive || !user) throw new CustomError(404, "User not found");
  if (bcrypt.compareSync(password, user.password)) return user;
  throw new CustomError(401, "Invalid credentials");
};
