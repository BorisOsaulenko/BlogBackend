import { createByEmail } from "./serviceMethods/createByEmail";
import { createById } from "./serviceMethods/createById";
import { getById } from "./serviceMethods/getById";
import { getByEmail } from "./serviceMethods/getByEmail";
import { toggleProfileFollow } from "./serviceMethods/toggleProfileFollow";
import { togglePostLike } from "./serviceMethods/togglePostLike";
import { togglePostDislike } from "./serviceMethods/togglePostDislike";
import { UserActivityRepository } from "../repository/repository";
import { UserRepository } from "../../user/repository/userRepository";
import { ProfileRepository } from "../../profile/repository/profileRepository";

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

  createById = createById.bind(this);
  createByEmail = createByEmail.bind(this);
  getById = getById.bind(this);
  getByEmail = getByEmail.bind(this);
  toggleProfileFollow = toggleProfileFollow.bind(this);
  togglePostLike = togglePostLike.bind(this);
  togglePostDislike = togglePostDislike.bind(this);
}
