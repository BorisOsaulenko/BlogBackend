import { createByEmail } from "./repositoryMethods/createByEmail";
import { createById } from "./repositoryMethods/createById";
import { getByEmail } from "./repositoryMethods/getByEmail";
import { getById } from "./repositoryMethods/getById";
import { follow } from "./repositoryMethods/follow";
import { unfollow } from "./repositoryMethods/unfollow";
import { like } from "./repositoryMethods/like";
import { dislike } from "./repositoryMethods/dislike";
import { removeLikeSign } from "./repositoryMethods/removeLikeSign";

export class UserActivityRepository {
  public static createById = createById;
  public static createByEmail = createByEmail;
  public static getById = getById;
  public static getByEmail = getByEmail;
  public static follow = follow;
  public static unfollow = unfollow;
  public static like = like;
  public static dislike = dislike;
  public static removeLikeSign = removeLikeSign;
}
