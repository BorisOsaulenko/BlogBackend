export interface Post {
  authorNickName: string;
  authorAvatar: string;
  media: string[];
  type: PostType;
  tags: string[];
  allowComments: boolean;
  allowedUsers?: string[]; // for private posts
  blockedUsers?: string[]; // for all posts

  likes: string[]; // emails of who put like
  dislikes: string[];
  views: number;
  posted: number;
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
