import { z } from "zod";
import { UserRepo } from "../user.repository";

export const changePasswordRequest = z
  .object({
    email: z
      .string()
      .email("Invalid email")
      .refine(async (email) => await UserRepo.getUserByEmail(email), "User does not exist"),
    previousPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password should not be less than 8 symbols")
      .regex(
        new RegExp(".*[A-z].*"),
        "Passwords must contain at least: 1 downcase letter, 1 uppercase letter"
      )
      .regex(new RegExp(".*\\d.*"), "Passwords must contain at least 1 number")
      .regex(
        new RegExp(".*[!@#$%^&*()_+=±§~`/;:,.><|].*"),
        "Passwords must contain at least 1 special symbol"
      ),
  })
  .refine(
    async ({ email, previousPassword }) =>
      (await UserRepo.getUserByEmail(email))?.password === previousPassword,
    "Wrong password"
  )
  .refine(
    ({ previousPassword, newPassword }) => previousPassword !== newPassword,
    "You cant change password to the same password"
  );
