export interface Post {
  authorNickName: string;
  media: string[];
  likes: string[]; // emails of who put likes
  dislikes: string[];
  type: PostType;
  views: number;
  tags: string[];
  posted: number;
  allowComments: boolean;
  authorAvatar: string;
  allowedUsers?: string[]; // for private posts
  blockedUsers?: string[]; // for all posts
}

export interface postFieldsProvidedByUser {
  tags: string[];
  media: string[];
  type: PostType;
  allowComments: boolean;
  allowedUsers?: string[];
  blockedUsers?: string[];
}

export enum PostType {
  PUBLIC = "public",
  SPONSORS = "sponsors",
  PRIVATE = "private",
}
