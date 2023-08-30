import { ZodError } from "zod";
import HttpException from "../../error/error";
import { UserRepo } from "../user.repository";
import { loginRequest } from "../zodRequests/loginRequest";

export const login = async (email: string, password: string) => {
  try {
    await loginRequest.parseAsync({ email, password });
  } catch (error) {
    throw new HttpException(400, (error as ZodError).issues[0].message);
  }

  const user = await UserRepo.getUserByEmail(email);

  return { message: "Logged in successfully", user: user };
};
