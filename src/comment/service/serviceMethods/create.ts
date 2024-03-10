import { CustomError } from "../../../customError/error";
import { PostRepository } from "../../../post/repository/postRepository";
import { checkIsUserAllowedUnderPost } from "../../../utils/checkIsUserAllowedUnderPost";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { CommentService } from "../service";

export const create = async function (
  this: CommentService,
  postId: string,
  content: string,
  token?: string
) {
  if (!content) throw new CustomError(400, "Content is required");

  const user = await validateAuthTokenSignature(this.userRepository, token);
  const profile = await this.profileRepository.getByUserId(user._id.toString());
  if (!profile) throw new CustomError(404, "Profile needed to comment");

  const post = await PostRepository.getById(postId);
  if (!post) throw new CustomError(404, "Post not found");
  if (!post.allowComments)
    throw new CustomError(403, "Comments are not allowed");
  if (!checkIsUserAllowedUnderPost(user, post)) {
    throw new CustomError(403, "You dont have permission to comment");
  }

  this.commentRepository.create({
    postId,
    content,
    authorNickName: profile.nickName,
    authorAvatar: profile.avatarURL,
    likes: 0,
    dislikes: 0,
    createdAt: Date.now(),
  });

  return;
};
