import { checkCredentials } from "../../../utils/checkCredentials";
import { UserService } from "../service";

export const login = async function (
  this: UserService,
  email: string,
  password: string
) {
  const user = await checkCredentials(email, password, this.userRepository);

  return user;
};
 