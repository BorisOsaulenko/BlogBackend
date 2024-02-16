import z from "zod";

export const updateRequest = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email")
      .optional(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
        "Password must contain at least one special character"
      )
      .optional(),
  })
  .superRefine((req, ctx) => {
    if (!req?.email && !req?.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No credentials provided",
      });
    }
  });
