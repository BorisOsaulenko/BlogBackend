import { ObjectId } from "mongodb";
import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../utils/checkCredentials";
import { getPostById } from "../../repository/getPostById";
import { getProfileByEmail } from "../../../profile/repository/getProfileByEmail";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";

export const deletePost = async (token: string | undefined, postId: string) => {
  const { email, password } = validateAuthTokenSignature(token);
  await checkCredentials(email, password);

  const profile = await getProfileByEmail(email);
  if (!profile) throw new CustomError(404, "Profile not found");

  const post = await getPostById(postId);
  if (!post) throw new CustomError(404, "Post not found");
  if (post.authorName !== profile.name)
    throw new CustomError(403, "You are not authorized to delete this post");

  return await Mongo.posts().deleteOne({ _id: new ObjectId(postId) });
};
