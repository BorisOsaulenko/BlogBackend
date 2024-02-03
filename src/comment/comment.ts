export interface Comment {
  postId: string;
  authorNickName: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: number; //timestamp
}
