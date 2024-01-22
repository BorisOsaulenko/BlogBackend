import jwt from "jsonwebtoken";
import { CustomError } from "../customError/error";
import { checkCredentials } from "./checkCredentials";
import { WithId } from "mongodb";
import { User } from "../user/user";

export const validateAuthTokenSignature = async (
  token?: string
): Promise<User> => {
  if (!token) throw new CustomError(401, "Invalid token");

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as User;

    await checkCredentials(user.email, user.password);
    return user;
  } catch (error) {
    throw new CustomError(401, "Invalid credentials");
  }
};
