import { login } from "./serviceMethods/login";
import { register } from "./serviceMethods/register";
import { update } from "./serviceMethods/update";
import { deleteUser } from "./serviceMethods/delete";
import { activation } from "./serviceMethods/activation";
import { UserRepository } from "../repository/userRepository";
import { ProfileRepository } from "../../profile/repository/profileRepository";
import { UserActivityRepository } from "../../userActivity/repository/repository";

export class UserService {
  protected userRepository: UserRepository;
  protected profileRepository: ProfileRepository;
  protected userActivatityRepository: UserActivityRepository;

  constructor(
    userRepository: UserRepository,
    profileRepository: ProfileRepository,
    userActivatityRepository: UserActivityRepository
  ) {
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
    this.userActivatityRepository = userActivatityRepository;
  }
  login = login;
  register = register;
  update = update;
  delete = deleteUser;
  activation = activation;
}