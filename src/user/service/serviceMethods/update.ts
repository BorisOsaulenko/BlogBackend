import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { UserRepository } from "../../repository/userRepository";

interface credentials {
  email?: string;
  password?: string;
}

export const update = async (token: string, updateCredentials: credentials) => {
  const user = await validateAuthTokenSignature(token);
  if (!user) throw new CustomError(401, "Invalid credentials");

  if (updateCredentials.email) {
    const existingUser = await UserRepository.getByEmail(
      updateCredentials?.email
    );
    if (existingUser) throw new CustomError(400, "Email already in use");
  }

  const updatedUser = await UserRepository.updateByEmail(
    user.email,
    updateCredentials
  );

  return updatedUser;
};
