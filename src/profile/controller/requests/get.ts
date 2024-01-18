import z from "zod";
import { checkDoesUserExists } from "../../../utils/checkDoesUserExists";

export const get = z.object({
  email: z
    .string({ errorMap: () => ({ message: "Email is required" }) })
    .email()
    .refine((email) => checkDoesUserExists(email), "User does not exist"),
});
