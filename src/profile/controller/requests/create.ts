import z from "zod";
import { profileRepository } from "../../repository/profileRepository";

export const create = z.object({
  nickName: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .refine(async (name) => {
      try {
        const profile = await profileRepository.getByName(name);
        return false; //if no error => profile exists
      } catch {
        return true;
      } //if error => profile not found => we can create
    }, "Profile with this name already exists"),
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
  surname: z
    .string()
    .min(2, { message: "Surname must be at least 2 characters long" })
    .optional(),
  bio: z.string().optional(),
});
