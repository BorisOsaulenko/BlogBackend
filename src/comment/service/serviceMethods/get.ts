import { Comment } from "../../comment";
import { CommentRepository } from "../../repository/commentRepository";

export const get = async (postId: string, paginationIdx: number) => {
  const comments: Comment[] | null = await CommentRepository.getByPostId(postId);
  if (!paginationIdx) return comments?.slice(0, 20);
  return comments?.slice(paginationIdx * 20, paginationIdx * 20 + 20);
};
