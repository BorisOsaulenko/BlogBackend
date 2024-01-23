import { login } from "./serviceMethods/login";
import { register } from "./serviceMethods/register";
import { update } from "./serviceMethods/update";
import { deleteUser } from "./serviceMethods/delete";
import { activation } from "./serviceMethods/activation";
import { Credentials } from "../user";

export class UserService {
  login = login;
  register = register;
  update = update;
  delete = deleteUser;
  activation = activation;
}