import { z } from "zod";
import { UserRepo } from "../user.repository";
import { User } from "../user";

export const updateRequest = z
  .object({
    email: z
      .string()
      .email("Invalid email")
      .refine(async (email) => await UserRepo.getUserByEmail(email), "User does not exists"),
    password: z.string(),
    avatars: z.array(z.string().url("Avatars must be url-encoded")).optional(),
    name: z.string().min(3, "Name can not be less than 3 symbols").optional(),
    surname: z.string().min(3, "Surname can not be less than 3 symbols").optional(),
  })
  .refine(async ({ email, password }) => (await UserRepo.getUserByEmail(email))?.password === password, { message: "Wrong password" });
