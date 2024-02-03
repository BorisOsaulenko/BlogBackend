import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { Post } from "../../post";
import { accessManager } from "../../repository/getByFilter/accessManager";
import { PostRepository, postFilter } from "../../repository/postRepository";

export const getByFilter = async (filter: postFilter, token?: string): Promise<Post[]> => {
  const user = await validateAuthTokenSignature(token);
  const posts = await PostRepository.getByFilter(user, filter);
  return accessManager(user, posts);
};
