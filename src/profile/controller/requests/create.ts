import z from "zod";
import { ProfileRepository } from "../../repository/profileRepository";

export const create = z.object({
  nickName: z
    .string({ required_error: "Nickname is required" })
    .min(2, { message: "Nickname must be at least 2 characters long" }),
  avatarURL: z
    .string({ required_error: "Avatar URL is required" })
    .url({ message: "Invalid URL" }),
  livePlace: z
    .string()
    .min(2, { message: "Live place must be at least 2 characters long" })
    .optional(),
  birthdate: z.number().optional(),
  school: z
    .string()
    .min(10, { message: "School must be at least 10 characters long" })
    .optional(),
  bio: z.string().optional(),
});
