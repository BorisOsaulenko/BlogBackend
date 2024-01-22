import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deleteComment } from "./serviceMethods/delete";

export class CommentService {
  public create = create;
  public update = update;
  public delete = deleteComment;
}
