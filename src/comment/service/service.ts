import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deleteComment } from "./serviceMethods/delete";
import { get } from "./serviceMethods/get";
import { ProfileRepository } from "../../profile/repository/profileRepository";
import { CommentRepository } from "../repository/commentRepository";
import { UserRepository } from "../../user/repository/userRepository";

export class CommentService {
  protected profileRepository;
  protected commentRepository;
  protected userRepository;

  constructor(
    commentRepository: CommentRepository,
    profileRepository: ProfileRepository,
    userRepository: UserRepository
  ) {
    this.commentRepository = commentRepository;
    this.profileRepository = profileRepository;
    this.userRepository = userRepository;
  }
  public create = create;
  public get = get;
  public update = update;
  public delete = deleteComment;
}
