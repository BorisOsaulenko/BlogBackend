import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { getPostById } from "../../../post/repository/getPostById";
import { checkCredentials } from "../../../utils/checkCredentials";

export const create = async (
  email: string,
  password: string,
  postId: string,
  content: string
) => {
  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(401, "Invalid credentials"); //todo: implement blocking users

  if (!postId) throw new CustomError(400, "Post id is required");
  const post = await getPostById(postId);
  if (!post) throw new CustomError(404, "Post not found");

  const comment = await Mongo.comments().insertOne({
    content,
    authorId: String(user._id),
    postId: String(post._id),
    likes: [],
    createdAt: new Date(),
  });

  return comment;
};
