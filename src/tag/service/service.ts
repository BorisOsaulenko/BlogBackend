import { createTag } from "./serviceMethods/create";
import { updateTag } from "./serviceMethods/update";
import { deleteTag } from "./serviceMethods/delete";
import { TagRepository } from "../repository/repository";
import { UserRepository } from "../../user/repository/userRepository";
import { get } from "./serviceMethods/get";

export class TagService {
  protected tagRepository;
  protected userRepository;
  constructor(tagRepository: TagRepository, userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.tagRepository = tagRepository;
  }
  public create = createTag;
  public get = get;
  public update = updateTag;
  public delete = deleteTag;
}
