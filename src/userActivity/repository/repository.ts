import { create } from "./repositoryMethods/create";
import { getById } from "./repositoryMethods/getById";
import { getByUserId } from "./repositoryMethods/getByUserId";
import { follow } from "./repositoryMethods/follow";
import { unfollow } from "./repositoryMethods/unfollow";
import { deleteById } from "./repositoryMethods/deleteById";
import { deleteByUserId } from "./repositoryMethods/deleteByUserId";
import { putLike } from "./repositoryMethods/putLike";
import { removeLike } from "./repositoryMethods/removeLike";
import { putDislike } from "./repositoryMethods/putDislike";
import { removeDislike } from "./repositoryMethods/removeDislike";

export class UserActivityRepository {
  public create = create.bind(this);
  public getById = getById.bind(this);
  public getByUserId = getByUserId.bind(this);
  public follow = follow.bind(this);
  public unfollow = unfollow.bind(this);
  public putLike = putLike.bind(this);
  public removeLike = removeLike.bind(this);
  public putDislike = putDislike.bind(this);
  public removeDislike = removeDislike.bind(this);
  public deleteById = deleteById.bind(this);
  public deleteByUserId = deleteByUserId.bind(this);
}
