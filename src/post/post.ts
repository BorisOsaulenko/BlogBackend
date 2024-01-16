import { tags } from "./tags";

export interface Post {
  authorId: string;
  media: string[];
  likes: string[];
  type: PostType;
  comments: string[];
  views: number;
  tags: string[];
  posted: Date;
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
