import { Mongo } from "../../mongo";
import { tags } from "../tags";
import { sortByEnum } from "../controller/requests/filter";
import { Post } from "../post";
import { getUserByProfileName } from "../../user/repository/getUserByProfileName";

interface filter {
  tags?: tags[];
  author?: string;
  posted?: Date[];
  sortBy: sortByEnum;
}

interface mongoFilter {
  tags?: { $in: tags[] };
  authorId?: string; //name
  posted?: { $gt: Date; $lt: Date };
}

export const getPostsByFilter = async (filter: filter) => {
  const { tags, author, posted, sortBy } = filter;
  const mongoFilter: mongoFilter = {};

  if (tags !== undefined) mongoFilter["tags"] = { $in: tags };
  if (author !== undefined) {
    const user = await getUserByProfileName(author);
    mongoFilter["authorId"] = String(user?._id);
  }
  if (posted !== undefined)
    mongoFilter["posted"] = { $gt: posted[0], $lt: posted[1] };

  console.log(mongoFilter);

  const posts: Post[] = await Mongo.posts().find(mongoFilter).toArray();

  switch (sortBy) {
    case sortByEnum.oldest:
      return posts.sort((a, b) => {
        return new Date(a.posted).getTime() - new Date(b.posted).getTime();
      });

    case sortByEnum.latest:
      return posts.sort((a, b) => {
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      });

    case sortByEnum.likes:
      return posts.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });

    case sortByEnum.popular:
      return posts.sort((a, b) => {
        return b.comments.length - a.comments.length;
      });

    default:
      return posts.sort((a, b) => {
        return b.views - a.views;
      });
  }
};
