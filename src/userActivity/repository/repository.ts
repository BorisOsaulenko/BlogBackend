import { createByEmail } from "./repositoryMethods/createByEmail";
import { createById } from "./repositoryMethods/createById";
import { getByEmail } from "./repositoryMethods/getByEmail";
import { getById } from "./repositoryMethods/getById";
import { follow } from "./repositoryMethods/follow";
import { unfollow } from "./repositoryMethods/unfollow";
import { like } from "./repositoryMethods/like";
import { dislike } from "./repositoryMethods/dislike";
import { removeLikeSign } from "./repositoryMethods/removeLikeSign";
import { UserRepository } from "../../user/repository/userRepository";
import { deleteById } from "./repositoryMethods/deleteById";
import { deleteByUserEmail } from "./repositoryMethods/deleteByUserEmail";
import { deleteByUserId } from "./repositoryMethods/deleteByUserId";
import { ProfileRepository } from "../../profile/repository/profileRepository";

export class UserActivityRepository {
  protected userRepository: UserRepository;
  protected profileRepository: ProfileRepository;

  constructor(
    userRepository: UserRepository,
    profileRepository: ProfileRepository
  ) {
    this.profileRepository = profileRepository;
    this.userRepository = userRepository;
  }
  public createById = createById.bind(this);
  public createByEmail = createByEmail.bind(this);
  public getById = getById.bind(this);
  public getByEmail = getByEmail.bind(this);
  public follow = follow.bind(this);
  public unfollow = unfollow.bind(this);
  public like = like.bind(this);
  public dislike = dislike.bind(this);
  public removeLikeSign = removeLikeSign.bind(this);
  public deleteById = deleteById.bind(this);
  public deleteByUserEmail = deleteByUserEmail.bind(this);
  public deleteByUserId = deleteByUserId.bind(this);
}
