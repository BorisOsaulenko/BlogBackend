import { Comment } from "../../comment";
import { CommentRepository } from "../../repository/commentRepository";
import { CommentService } from "../service";

export const get = async function (
  this: CommentService,
  postId: string,
  paginationIdx: number
) {
  const comments: Comment[] | null = await this.commentRepository.getByPostId(
    postId
  );
  if (!paginationIdx) return comments?.slice(0, 20);
  return comments?.slice(paginationIdx * 20, paginationIdx * 20 + 20);
};
