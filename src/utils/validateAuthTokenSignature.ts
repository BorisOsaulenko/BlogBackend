import jwt from "jsonwebtoken";
import { CustomError } from "../customError/error";

export const validateAuthTokenSignature = (token: string | undefined) => {
  if (!token) throw new CustomError(401, "Invalid token");

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as unknown as {
      email: string;
      password: string;
    };
  } catch (error) {
    throw new CustomError(401, "Invalid credentials");
  }
};
