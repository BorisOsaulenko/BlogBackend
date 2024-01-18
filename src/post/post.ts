import { tags } from "./tags";

export interface Post {
  authorName: string;
  media: string[];
  likes: string[];
  type: PostType;
  comments: string[];
  views: number;
  tags: string[];
  posted: Date;
  authorAvatar?: string;
}

export interface postFieldsProvidedByUser {
  tags: tags[];
  media: string[];
  type: PostType;
}

export enum PostType {
  PUBLIC = "public",
  SPONSORS = "sponsors",
  PRIVATE = "private",
}
