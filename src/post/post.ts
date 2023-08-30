import { z } from "zod";

export const MIN_SYMBOLS_FOR_HEADING = 10;
export const MIN_SYMBOLS_FOR_CONTENT = 30;

export interface Post {
  author: string;
  heading: string;
  content: string;
  images: string[];
  tags: string[];
  type: PostType;
  views: Number;
  likes: Number;
  createdAt: Date;
}

export enum PostType {
  PUBLIC = "PUBLIC",
  SPONSORS = "SPONSORS",
  PRIVATE = "PRIVATE",
}
