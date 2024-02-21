import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { Role } from "../../../user/user";
import { checkCredentials } from "../../../utils/checkCredentials";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { TagService } from "../service";

export const createTag = async function (
  this: TagService,
  content: string,
  token?: string
) {
  if (!token) {
    throw new CustomError(401, "Unauthorized");
  }

  const user = await validateAuthTokenSignature(this.userRepository,  token);
  if (user.roles.includes(Role.ADMIN)) {
    const createdTag = await Mongo.tags().insertOne({ content });
    return createdTag;
  } else {
    throw new CustomError(401, "You dont have permission");
  }
};
