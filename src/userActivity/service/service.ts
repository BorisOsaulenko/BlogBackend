import { create } from "./serviceMethods/create";
import { followProfile } from "./serviceMethods/followProfile";
import { like } from "./serviceMethods/like";
import { dislike } from "./serviceMethods/dislike";
import { UserActivityRepository } from "../repository/repository";
import { UserRepository } from "../../user/repository/userRepository";
import { ProfileRepository } from "../../profile/repository/profileRepository";
import { get } from "./serviceMethods/get";

export class UserActivityService {
  protected userActivityRepository: UserActivityRepository;
  protected userRepository: UserRepository;
  protected profileRepository: ProfileRepository;
  constructor(
    userActivityRepository: UserActivityRepository,
    userRepository: UserRepository,
    profileRepository: ProfileRepository
  ) {
    this.userActivityRepository = userActivityRepository;
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
  }

  create = create.bind(this);
  get = get.bind(this);
  followProfile = followProfile.bind(this);
  like = like.bind(this);
  dislike = dislike.bind(this);
}
