import z from "zod";

export const create = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  avatarURL: z
    .string({ required_error: "Avatar URL is required" })
    .url({ message: "Invalid URL" })
    .optional(),
  livePlace: z
    .string()
    .min(2, { message: "Live place must be at least 2 characters long" })
    .optional(),
  birthdate: z.date().optional(),
  school: z
    .string()
    .min(10, { message: "School must be at least 10 characters long" })
    .optional(),
  surname: z
    .string()
    .min(2, { message: "Surname must be at least 2 characters long" })
    .optional(),
  bio: z.string().optional(),
});
