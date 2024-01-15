import { checkCredentials } from "../../utils/checkCredentials";
import { Mongo } from "../../../mongo";
import { checkDoesUserExists } from "../../utils/checkDoesUserExists";
import { CustomError } from "../../../customError/error";

interface credentials {
  email?: string;
  password?: string;
}

export const update = async (
  email: string,
  password: string,
  updateCredentials: credentials
) => {
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
