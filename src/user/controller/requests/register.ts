import { z } from "zod";
import { Role } from "../../user";
import { checkDoesUserExists } from "../../utils/checkDoesUserExists";

export const registerRequest = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email")
    .refine(async (email) => !(await checkDoesUserExists(email)), {
      message: "User already exists",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
      "Password must contain at least one special character"
    ),
  roles: z.array(z.nativeEnum(Role)).optional().default([Role.USER]),
  createdAt: z.date().optional().default(new Date()),
});
