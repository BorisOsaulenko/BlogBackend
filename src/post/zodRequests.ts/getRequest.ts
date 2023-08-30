import { z } from "zod";

export const getRequest = z
  .object({
    author: z
      .string({ invalid_type_error: "Author must be a string" })
      .email({ message: "Author must be an email" }),
    tags: z
      .array(z.string({ invalid_type_error: "Tags must be string" }), {
        invalid_type_error: "Tags must be an array",
      })
      .refine((tags) => tags.length === new Set(tags).size, {
        message: "Tags can not repeat",
      }),
    dateFrom: z.date({
      invalid_type_error: "Date must be an JS Date() object",
    }),
    dateTo: z.date({ invalid_type_error: "Date must be an JS Date() object" }),
  })
  .strict()
  .partial()
  .refine(({ author, tags, dateFrom, dateTo }) => {
    return author || tags || (dateFrom && dateTo);
  }, "Filters required: author, tags or dateFrom and dateTo");
