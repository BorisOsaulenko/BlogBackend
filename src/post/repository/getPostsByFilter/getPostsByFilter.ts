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
import { publicPart } from "./publicPart";
import { checkCredentials } from "../../../utils/checkCredentials";

interface filter {
  tags?: tags[];
  author?: string;
  posted?: number[];
  sortBy?: sortByEnum;
}

export const getPostsByFilter = async (
  token: string | undefined,
  filter: filter
) => {
  const { tags, author, posted, sortBy } = filter;

  const mongoFilter = createMongoFilter(tags, author, posted);
  const posts: WithId<Post>[] = await Mongo.posts().find(mongoFilter).toArray();

  if (!token)
    return publicPart(posts.filter((post) => post.type === PostType.PUBLIC));
  const { email, password } = validateAuthTokenSignature(token);

  const user = await getUserByEmail(email);
  if (!user || user.password !== password || !user.isActive)
    return publicPart(posts.filter((post) => post.type === PostType.PUBLIC));

  const sortedPosts = sort(posts, sortBy || sortByEnum.popular);
  return publicPart(postAccessTypeFilter(sortedPosts, user));
};
