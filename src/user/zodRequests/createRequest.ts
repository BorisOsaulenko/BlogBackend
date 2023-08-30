import { z } from "zod";
import { UserType } from "../user";
import { UserRepo } from "../user.repository";

export const createRequest = z
  .object({
    email: z
      .string()
      .email("Incorrect email provided")
      .refine(async (email) => !(await UserRepo.getUserByEmail(email)), "User already exists"),
    password: z
      .string()
      .min(8, "Password should not be less than 8 symbols")
      .regex(new RegExp(".*[A-z].*"), "Passwords must contain at least: 1 downcase letter, 1 uppercase letter")
      .regex(new RegExp(".*\\d.*"), "Passwords must contain at least 1 number")
      .regex(new RegExp(".*[!@#$%^&*()_+=±§~`/;:,.><|].*"), "Passwords must contain at least 1 special symbol"),
    avatars: z.array(z.string().url("Avatars should be url-encoded")),
    name: z.string().min(3, "User name can not be less than 3 symbols"),
    surname: z.string().min(3, "User surname can not be less than 3 symbols"),
  })
  .strict();
