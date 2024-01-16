import { z } from "zod";
import { PostType } from "../../post";
import { tags } from "../../tags";

export const create = z.object({
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
  type: z.nativeEnum(PostType, {
    errorMap: () => ({
      message: "invalid post type. valid types: public, sponsors, private",
    }),
  }),
});
