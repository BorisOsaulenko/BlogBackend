import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deleteProfile } from "./serviceMethods/delete";
import { get } from "./serviceMethods/get";
import { ProfileRepository } from "../repository/profileRepository";
import { UserRepository } from "../../user/repository/userRepository";

export class ProfileService {
  protected profileRepository: ProfileRepository;
  protected userRepository: UserRepository;

  constructor(
    profileRepository: ProfileRepository,
    userRepository: UserRepository
  ) {
    this.profileRepository = profileRepository;
    this.userRepository = userRepository;
  }
  public create = create;
  public update = update;
  public get = get;
  public delete = deleteProfile;
};
