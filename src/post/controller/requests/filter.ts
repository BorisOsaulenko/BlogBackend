import { z } from "zod";
import { tags } from "../../tags";

export enum sortByEnum {
  "latest" = "latest",
  "oldest" = "oldest",
  "likes" = "likes",
  "popular" = "popular",
}

export const filter = z
  .object({
    tags: z.array(
      z.nativeEnum(tags, { errorMap: () => ({ message: "invalid tag" }) })
    ),
    posted: z.array(z.number()).length(2),
    author: z.string(), //name
    sortBy: z
      .nativeEnum(sortByEnum, {
        invalid_type_error:
          "invalid sort type. valid types: latest, oldest, likes, popular",
      })
      .default(sortByEnum.popular),
  })
  .partial();
