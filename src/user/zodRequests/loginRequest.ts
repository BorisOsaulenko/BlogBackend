import { z } from "zod";
import { UserRepo } from "../user.repository";

export const loginRequest = z
  .object({
    email: z
      .string()
      .email("Invalid email")
      .refine(async (email) => await UserRepo.getUserByEmail(email), "User does not exists"),
    password: z.string(),
  })
  .refine(
    async ({ email, password }) => (await UserRepo.getUserByEmail(email))?.password === password,
    "Wrong password"
  );
