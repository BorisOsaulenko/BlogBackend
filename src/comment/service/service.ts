import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deleteComment } from "./serviceMethods/delete";
import { get } from "./serviceMethods/get";

export class CommentService {
  public create = create;
  public get = get;
  public update = update;
  public delete = deleteComment;
}
