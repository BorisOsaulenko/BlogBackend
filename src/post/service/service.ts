import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deletePost } from "./serviceMethods/delete";
import { getByFilter } from "./serviceMethods/getByFilter/getByFilter";

export class PostService {
  public create = create;
  public update = update;
  public delete = deletePost;
  public getByFilter = getByFilter;
};
