import { z } from "zod";
import { UserRepo } from "../user.repository";

export const deleteRequest = z
  .object({
    email: z
      .string()
      .email("Invalid email")
      .refine(async (email) => await UserRepo.getUserByEmail(email), "User does not exist"),
    password: z.string(),
  })
  .refine(
    async ({ email, password }) => (await UserRepo.getUserByEmail(email))?.password === password,
    "Wrong password"
  );
