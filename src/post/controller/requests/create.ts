import { z } from "zod";
import { PostType } from "../../post";
import { profileRepository } from "../../../profile/repository/profileRepository";

export const create = z
  .object({
    tags: z
      .array(z.string().min(2), {
        required_error: "at least two tags are required",
      })
      .min(2, "at least two tags are required"),
    media: z
      .array(z.string().url(), {
        required_error: "at least one media URL is required",
      })
      .min(1, "at least one media URL is required"),
    type: z.nativeEnum(PostType, {
      errorMap: () => ({
        message: "invalid post type. valid types: public, sponsors, private",
      }),
    }),
    allowComments: z.boolean().optional().default(true),
    allowedUsers: z //string of emails only if post type is private
      .array(
        z
          .string()
          .email("invalid email")
          .refine(async (email) => await profileRepository.getByEmail(email), {
            message: "user not found",
          })
      )
      .min(1, "at least one user is required")
      .optional(),
  })
  .refine(
    (createPost) => {
      //check if allowedUsers is set in case if post is private
      if (createPost.type === PostType.PRIVATE && !createPost.allowedUsers) {
        return false;
      }
      return true;
    },
    { message: "at least one allowed user is required" }
  );