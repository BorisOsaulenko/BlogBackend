import { Filter } from "mongodb";
import { getUserByProfileName } from "../../../user/repository/getUserByProfileName";
import { tags } from "../../tags";
import { Post } from "../../post";

export interface mongoFilter extends Filter<Post> {
  tags?: { $in: tags[] };
  authorId?: string; //name
  posted?: { $gt: number; $lt: number };
}

export const createMongoFilter = (
  tags: tags[] | undefined,
  author: string | undefined,
  posted: number[] | undefined
) => {
  const mongoFilter: mongoFilter = {};

  if (tags !== undefined) mongoFilter["tags"] = { $in: tags };
  if (author !== undefined) mongoFilter["authorName"] = author;
  if (posted !== undefined)
    mongoFilter["posted"] = { $gt: posted[0], $lt: posted[1] };

  return mongoFilter;
};
