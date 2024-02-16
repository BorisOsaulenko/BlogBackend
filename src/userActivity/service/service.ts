import { createByEmail } from "./serviceMethods/createByEmail";
import { createById } from "./serviceMethods/createById";
import { getById } from "./serviceMethods/getById";
import { getByEmail } from "./serviceMethods/getByEmail";
import { toggleProfileFollow } from "./serviceMethods/toggleProfileFollow";
import { togglePostLike } from "./serviceMethods/togglePostLike";
import { togglePostDislike } from "./serviceMethods/togglePostDislike";

export class UserActivityService {
  createById = createById;
  createByEmail = createByEmail;
  getById = getById;
  getByEmail = getByEmail;
  toggleProfileFollow = toggleProfileFollow;
  togglePostLike = togglePostLike;
  togglePostDislike = togglePostDislike;
}
