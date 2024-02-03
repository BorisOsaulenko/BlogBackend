import { login } from "./serviceMethods/login";
import { register } from "./serviceMethods/register";
import { update } from "./serviceMethods/update";
import { deleteUser } from "./serviceMethods/delete";
import { activation } from "./serviceMethods/activation";
import { follow } from "./serviceMethods/follow";
import { unfollow } from "./serviceMethods/unfollow";
import { likePost } from "./serviceMethods/likePost";
import { unlikePost } from "./serviceMethods/unlikePost";

export class UserService {
  login = login;
  register = register;
  update = update;
  delete = deleteUser;
  activation = activation;
  follow = follow;
  unfollow = unfollow;
  likePost = likePost;
  unlikePost = unlikePost;
}