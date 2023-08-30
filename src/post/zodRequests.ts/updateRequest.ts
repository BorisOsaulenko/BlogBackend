import { z } from "zod";
import { MIN_SYMBOLS_FOR_CONTENT, MIN_SYMBOLS_FOR_HEADING, PostType } from "../post";
import { TagController } from "../../Tag/tag.controller";
import { TagService } from "../../Tag/tag.service";

export const updateRequest = z
  .object({
    id: z.string(),
    newTags: z
      .array(z.string().refine((tag) => TagService.checkTag(tag), "Some tags provided dont exists"))
      .min(2, "Required at least two tags")
      .refine((tags) => new Set(tags).size === tags.length, "Tags can not repeat")
      .optional(),
    newHeading: z.string().min(MIN_SYMBOLS_FOR_HEADING, "Too short heading").optional(),
    newContent: z.string().min(MIN_SYMBOLS_FOR_CONTENT, "Too short content").optional(),
    newImages: z
      .array(z.string().url("Images must contain url string"))
      .refine((imgs) => imgs.length === new Set(imgs).size, "Images should not repeat")
      .optional(),
    newType: z
      .nativeEnum(PostType, {
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            case "invalid_enum_value":
              return {
                message: "Wrong post type",
              };
            default:
              return { message: "Invalid post type" };
          }
        },
      })
      .optional(),
  })
  .strict()
  .refine((body) => {
    return Object.values(body).some((v) => v != undefined && v !== body.id);
  }, "At least some of update parameters must be set");
