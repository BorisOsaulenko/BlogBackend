import { z } from "zod";
import { tags } from "../../tags";

export enum sortByEnum {
  "latest" = "latest",
  "oldest" = "oldest",
  "likes" = "likes",
  "popular" = "popular",
}

export const filter = z.object({
  tags: z
    .array(z.nativeEnum(tags, { errorMap: () => ({ message: "invalid tag" }) }))
    .optional(),
  posted: z.array(z.date()).length(2).optional(),
  author: z.string().optional(), //name
  sortBy: z
    .nativeEnum(sortByEnum, {
      invalid_type_error:
        "invalid sort type. valid types: latest, oldest, likes, popular",
    })
    .optional()
    .default(sortByEnum.popular),
});
