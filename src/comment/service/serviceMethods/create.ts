import { CustomError } from "../../../customError/error";
import { profileRepository } from "../../../profile/repository/profileRepository";
import { validateAuthTokenSignature } from "../../../utils/validateAuthTokenSignature";
import { CommentRepository } from "../../repository/comment";

export const create = async (postId: string, content: string, token?: string) => {
  if (!content) throw new CustomError(400, "Content is required");

  const user = await validateAuthTokenSignature(token); //todo: implement blocking users
  const profile = await profileRepository.getByEmail(user.email);
  if (!profile) throw new CustomError(404, "Profile needed to comment");

  CommentRepository.create({
    postId,
    content,
    authorName: profile.nickName,
    authorAvatar: profile.avatarURL,
    likes: 0,
    dislikes: 0,
    createdAt: Date.now(),
    replies: [],
  });

  return;
};
