import { Mongo } from "../../../mongo";
import { tags } from "../../tags";
import { sortByEnum } from "../../controller/requests/filter";
import { Post, PostType } from "../../post";
import { createMongoFilter } from "./mongoFilter";
import { sort } from "./sort";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { getUserByEmail } from "../../../user/repository/getUserByEmail";
import { WithId } from "mongodb";
import { postAccessTypeFilter } from "./postAccessTypeFilter";

interface filter {
  tags?: tags[];
  author?: string;
  posted?: Date[];
  sortBy: sortByEnum;
}

export const getPostsByFilter = async (
  token: string | undefined,
  filter: filter
) => {
  const { tags, author, posted, sortBy } = filter;

  const mongoFilter = await createMongoFilter(tags, author, posted);
  const posts: WithId<Post>[] = await Mongo.posts().find(mongoFilter).toArray();

  if (!token) return posts.filter((post) => post.type === PostType.PUBLIC);
  const { email } = validateAuthTokenSignature(token);
  const user = await getUserByEmail(email);
  if (!user) return posts.filter((post) => post.type === PostType.PUBLIC);

  const sortedPosts = sort(posts, sortBy);
  return await postAccessTypeFilter(sortedPosts, user);
};
