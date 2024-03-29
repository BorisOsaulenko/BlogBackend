import { z } from "zod";

export const update = z
  .object({
    nickName: z
      .string({ required_error: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .optional(),
    avatarURL: z.string({ required_error: "Avatar URL is required" }).url({ message: "Invalid URL" }).optional(),
    livePlace: z.string().min(2, { message: "Live place must be at least 2 characters long" }).optional(),
    birthdate: z.number().optional(),
    school: z.string().min(10, { message: "School must be at least 10 characters long" }).optional(),
  })
  .refine(
    (profile) => {
      return profile.nickName || profile.avatarURL || profile.livePlace || profile.birthdate || profile.school;
    },
    {
      message: "No update data was provided",
    }
  );
