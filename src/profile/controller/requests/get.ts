import z from "zod";
import { UserRepository } from "../../../user/repository/userRepository";

export const get = z.object({
  email: z
    .string({ errorMap: () => ({ message: "Email is required" }) })
    .email()
    .refine(async (email) => !(await UserRepository.getByEmail(email)), "User does not exist"),
});
