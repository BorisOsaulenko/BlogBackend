import { z } from "zod";
import { MIN_SYMBOLS_FOR_CONTENT, MIN_SYMBOLS_FOR_HEADING, PostType } from "../post";
import { Mongo } from "../../mongo";
import { TagService } from "../../Tag/tag.service";

export const createRequest = z
  .object({
    author: z
      .string()
      .email("Author must be an email")
      .refine(async (author) => {
        return await Mongo.users().findOne({ email: author });
      }, "User does not exists"),
    heading: z.string().min(MIN_SYMBOLS_FOR_HEADING, { message: "Too short heading" }),
    content: z.string().min(MIN_SYMBOLS_FOR_CONTENT, { message: "Too short content" }),
    tags: z
      .array(z.string().refine(async (tag) => await TagService.checkTag(tag), "Some tags provided dont exists"))
      .min(2, "Required at least two tags")
      .refine((tags) => tags.length === new Set(tags).size, "Tags can not repeat"),
    images: z
      .array(z.string().url({ message: "Images should be url-encoded" }))
      .refine((imgs) => imgs.length === new Set(imgs).size, "Images should not repeat")
      .optional(),
    type: z.nativeEnum(PostType, {
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
    }),
  })
  .strict();
