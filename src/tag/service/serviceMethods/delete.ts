import { ObjectId } from "mongodb";
import { Mongo } from "../../../mongo";
import { Role } from "../../../user/user";
import { checkCredentials } from "../../../utils/checkCredentials";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { CustomError } from "../../../customError/error";
import { TagService } from "../service";

export const deleteTag = async function (
  this: TagService,
  id: string,
  token?: string
) {
  const user = await validateAuthTokenSignature(this.userRepository, token);
  if (user.roles.includes(Role.ADMIN)) {
    const deletedTag = await Mongo.tags().deleteOne({ _id: new ObjectId(id) });
    return deletedTag;
  } else {
    throw new CustomError(401, "You dont have permission");
  }
};
