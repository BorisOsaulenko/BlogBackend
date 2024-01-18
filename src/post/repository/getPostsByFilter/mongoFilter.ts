import { Filter } from "mongodb";
import { getUserByProfileName } from "../../../user/repository/getUserByProfileName";
import { tags } from "../../tags";
import { Post } from "../../post";

export interface mongoFilter extends Filter<Post> {
  tags?: { $in: tags[] };
  authorId?: string; //name
  posted?: { $gt: Date; $lt: Date };
}

export const createMongoFilter = async (
  tags: tags[] | undefined,
  author: string | undefined,
  posted: Date[] | undefined
) => {
  const mongoFilter: mongoFilter = {};

  if (tags !== undefined) mongoFilter["tags"] = { $in: tags };
  if (author !== undefined) {
    console.log(author);

    const user = await getUserByProfileName(author);
    mongoFilter["authorId"] = String(user?._id);
  }
  if (posted !== undefined)
    mongoFilter["posted"] = { $gt: posted[0], $lt: posted[1] };

  return mongoFilter;
};
