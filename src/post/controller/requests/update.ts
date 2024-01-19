import { z } from "zod";
import { tags } from "../../tags";
import { PostType } from "../../post";
import { getUserByEmail } from "../../../user/repository/getUserByEmail";

export const update = z
  .object({
    tags: z
      .array(z.nativeEnum(tags, { invalid_type_error: "invalid tag" }), {
        required_error: "at least two tags are required",
      })
      .min(2, "at least two tags are required"),
    media: z
      .array(z.string().url(), {
        required_error: "at least one media URL is required",
      })
      .min(1, "at least one media URL is required"),
    type: z.nativeEnum(PostType, { invalid_type_error: "invalid post type" }),
    allowComments: z.boolean(),
    allowedUsers: z
      .array(
        z
          .string()
          .email("invalid email")
          .refine(async (email) => {
            await getUserByEmail(email);
          })
      )
      .min(1, "at least one user is required"),
  })
  .partial()
  .refine(
    (updatePost) =>
      Object.values(updatePost).find((value) => value !== undefined),
    {
      message: "at least one update field is required",
    }
  )
  .refine(
    (updatePost) => {
      if (updatePost.type === PostType.PRIVATE && !updatePost.allowedUsers)
        return false;
      return true;
    },
    {
      message: "private post type requires a list of users allowed to see it",
    }
  );
