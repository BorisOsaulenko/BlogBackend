import { createTag } from "./serviceMethods/create";
import { updateTag } from "./serviceMethods/update";
import { deleteTag } from "./serviceMethods/delete";

export class TagService {
  public create = createTag;
  public update = updateTag;
  public delete = deleteTag;
}
