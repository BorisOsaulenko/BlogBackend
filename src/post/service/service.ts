import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deletePost } from "./serviceMethods/delete";
import { getByFilter } from "./serviceMethods/getByFilter/getByFilter";
import { PostRepository } from "../repository/postRepository";
import { UserRepository } from "../../user/repository/userRepository";
import { ProfileRepository } from "../../profile/repository/profileRepository";

export class PostService {
  protected profileRepository;
  protected postRepository;
  protected userRepository;

  constructor(
    postRepository: PostRepository,
    userRepository: UserRepository,
    profileRepository: ProfileRepository
  ) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
  }
  public create = create;
  public update = update;
  public delete = deletePost;
  public getByFilter = getByFilter;
};
