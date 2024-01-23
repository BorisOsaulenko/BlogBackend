export interface Post {
  authorName: string;
  media: string[];
  likes: string[];
  type: PostType;
  views: number;
  tags: string[];
  posted: number;
  allowComments: boolean;
  authorAvatar: string;
  allowedUsers?: string[]; // for private posts
}

export interface postFieldsProvidedByUser {
  tags: string[];
  media: string[];
  type: PostType;
  allowComments: boolean;
  allowedUsers?: string[];
}

export enum PostType {
  PUBLIC = "public",
  SPONSORS = "sponsors",
  PRIVATE = "private",
}
