import { Filter } from "mongodb";
import { Post } from "../../post";

export interface mongoFilter extends Filter<Post> {
  tags?: { $in: string[] };
  authorId?: string;
  posted?: { $gt: number; $lt: number };
}

export const generateMongoFilter = (
  tags?: string[],
  authorNickName?: string,
  dateFrom?: number,
  dateTo?: number
): mongoFilter => {
  const mongoFilter: mongoFilter = {};

  if (tags !== undefined) mongoFilter["tags"] = { $in: tags };
  if (authorNickName !== undefined) mongoFilter["authorNickName"] = authorNickName;
  if (dateFrom !== undefined && dateTo !== undefined) mongoFilter["posted"] = { $gt: dateFrom, $lt: dateTo };

  return mongoFilter;
};
