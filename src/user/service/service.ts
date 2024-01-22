import { login } from "./serviceMethods/login";
import { register } from "./serviceMethods/register";
import { update } from "./serviceMethods/update";
import { deleteUser } from "./serviceMethods/delete";
import { activation } from "./serviceMethods/activation";
import { Credentials } from "../user";

export class UserService {
  static async login(email: string, password: string) {
    return await login(email, password);
  }
  static async register(creds: Credentials) {
    return await register(creds);
  }

  static async update(token: string, updateCredentials: Partial<Credentials>) {
    return await update(token, updateCredentials);
  }

  static async delete(token: string) {
    return await deleteUser(token);
  }

  static async activation(email: string, token: string) {
    return await activation(email, token);
  }
}