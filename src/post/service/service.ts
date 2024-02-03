import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deletePost } from "./serviceMethods/delete";
import { PostRepository, postFilter } from "../repository/postRepository";
import { User } from "../../user/user";
import { validateAuthTokenSignature } from "../../utils/validateAuthTokenSignature";

export class PostService {
  public create = create;
  public update = update;
  public delete = deletePost;
  public async getByFilter(filter: postFilter, token?: string) {
    const user = await validateAuthTokenSignature(token);
    return PostRepository.getByFilter(user, filter);
  }
};
