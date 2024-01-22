import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { Role } from "../../../user/user";
import { checkCredentials } from "../../../utils/checkCredentials";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";

export const createTag = async (content: string, token?: string) => {
  if (!token) {
    throw new CustomError(401, "Unauthorized");
  }

  const user = await validateAuthTokenSignature(token);
  if (user.roles.includes(Role.ADMIN)) {
    const createdTag = await Mongo.tags().insertOne({ content });
    return createdTag;
  } else {
    throw new CustomError(401, "You dont have permission");
  }
};
