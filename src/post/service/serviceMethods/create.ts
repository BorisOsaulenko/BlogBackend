import { Mongo } from "../../../mongo";
import { postFieldsProvidedByUser } from "../../post";
import { checkCredentials } from "../../../user/utils/checkCredentials";
import { CustomError } from "../../../customError/error";
import { getProfileByEmail } from "../../../profile/repository/getProfileByEmail";

export const create = async (
  email: string,
  password: string,
  post: postFieldsProvidedByUser
) => {
  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(404, "User not found");
  if (!(await getProfileByEmail(email)))
    throw new CustomError(404, "Profile not found");

  return await Mongo.posts().insertOne({
    ...post,
    authorId: String(user._id),
    posted: new Date(),
    views: 0,
    likes: [],
    comments: [],
  });
};
