export interface UserActivity {
  userId: string;
  following: { nickName: string; avatarURL: string }[];
  likedPosts: string[]; // list of post ids
  dislikedPosts: string[];
}
