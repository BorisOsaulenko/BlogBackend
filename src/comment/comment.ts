export interface Comment {
  postId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: number; //timestamp
  replies: Comment[]; //answers to the comment
}
