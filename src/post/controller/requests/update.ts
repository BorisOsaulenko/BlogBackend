import { z } from "zod";
import { tags } from "../../tags";
import { PostType } from "../../post";

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
  })
  .partial()
  .refine(
    (updatePost) => updatePost.tags || updatePost.media || updatePost.type,
    {
      message: "at least one update field is required",
    }
  );
