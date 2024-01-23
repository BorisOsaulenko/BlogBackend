import { ObjectId } from "mongodb";
import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { profileRepository } from "../../../profile/repository/profileRepository";
import { PostRepository } from "../../repository/postRepository";

export const deletePost = async (token: string | undefined, postId: string) => {
  const user = await validateAuthTokenSignature(token);

  const profile = await profileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile not found");

  const post = await PostRepository.getPostById(postId);
  if (!post) throw new CustomError(404, "Post not found");

  if (post.authorName !== profile.nickName)
    throw new CustomError(403, "You are not authorized to delete this post");

  return await PostRepository.delete(postId);
};
