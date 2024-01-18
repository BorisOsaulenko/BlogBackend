import { checkCredentials } from "../../../utils/checkCredentials";
import { Mongo } from "../../../mongo";
import { CustomError } from "../../../customError/error";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";

interface credentials {
  email?: string;
  password?: string;
}

export const update = async (token: string, updateCredentials: credentials) => {
  const { email, password } = validateAuthTokenSignature(token);
  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(401, "Invalid credentials");

  const updatedUser = await Mongo.users().updateOne(
    { email: user.email },
    {
      $set: {
        email: updateCredentials.email || user.email,
        password: updateCredentials.password || user.password,
      },
    }
  );

  return updatedUser;
};
