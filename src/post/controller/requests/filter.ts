import { z } from "zod";

export enum sortByEnum {
  "latest" = "latest",
  "oldest" = "oldest",
  "likes" = "likes",
  "popular" = "popular",
}

export const filter = z
  .object({
    tags: z.array(z.string().min(1)),
    posted: z.array(z.number()).length(2),
    author: z.string().min(2), //name
    sortBy: z
      .nativeEnum(sortByEnum, {
        invalid_type_error:
          "invalid sort type. valid types: latest, oldest, likes, popular",
      })
      .default(sortByEnum.popular),
  })
  .partial();
