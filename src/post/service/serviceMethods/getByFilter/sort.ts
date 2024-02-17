import { WithId } from "mongodb";
import { sortByEnum } from "../../../controller/requests/filter";
import { Post } from "../../../post";

export const sort = (posts: WithId<Post>[], sortBy: sortByEnum) => {
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
        return b.views - a.views;
      });

    default:
      return posts.sort((a, b) => {
        return b.views - a.views;
      });
  }
};
