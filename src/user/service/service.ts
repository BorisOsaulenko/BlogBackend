import { login } from "./serviceMethods/login";
import { register } from "./serviceMethods/register";
import { update } from "./serviceMethods/update";
import { deleteUser } from "./serviceMethods/delete";
import { activation } from "./serviceMethods/activation";

export const UserService = {
  login,
  register,
  update,
  deleteUser,
  activation,
};
