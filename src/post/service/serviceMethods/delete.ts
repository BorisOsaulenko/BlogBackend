import { ObjectId } from "mongodb";
import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { checkCredentials } from "../../../user/utils/checkCredentials";
import { getPostById } from "../../repository/getPostById";

export const deletePost = async (
  email: string,
  password: string,
  postId: string
) => {
  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(403, "Invalid credentials");

  const post = await getPostById(postId);
  if (!post) throw new CustomError(404, "Post not found");
  if (post.authorId !== String(user._id))
    throw new CustomError(403, "You are not authorized to delete this post");

  return await Mongo.posts().deleteOne({ _id: new ObjectId(postId) });
};
