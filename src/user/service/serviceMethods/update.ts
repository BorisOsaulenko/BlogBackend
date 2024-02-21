import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { Credentials } from "../../user";
import { UserService } from "../service";

export const update = async function (
  this: UserService,
  token: string,
  updateCredentials: Partial<Credentials>
) {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  if (!user) throw new CustomError(401, "Invalid credentials");

  if (updateCredentials.email) {
    const existingUser = await this.userRepository.getByEmail(
      updateCredentials?.email
    );
    if (existingUser) throw new CustomError(400, "Email already in use");
  }

  const updatedUser = await this.userRepository.updateByEmail(
    user.email,
    updateCredentials
  );

  return updatedUser;
};
