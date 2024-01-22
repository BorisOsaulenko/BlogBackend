import { Filter } from "mongodb";
import { Post } from "../../post";

export interface mongoFilter extends Filter<Post> {
  tags?: { $in: string[] };
  authorId?: string; //name
  posted?: { $gt: number; $lt: number };
}

export const generateMongoFilter = (
  tags?: string[],
  author?: string,
  dateFrom?: number,
  dateTo?: number
): mongoFilter => {
  const mongoFilter: mongoFilter = {};

  if (tags !== undefined) mongoFilter["tags"] = { $in: tags };
  if (author !== undefined) mongoFilter["authorName"] = author;
  if (dateFrom !== undefined && dateTo !== undefined) mongoFilter["posted"] = { $gt: dateFrom, $lt: dateTo };

  return mongoFilter;
};
