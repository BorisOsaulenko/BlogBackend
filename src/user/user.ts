import { Document } from "mongodb";

export interface User {
  email: string;
  password: string;
  type: UserType[];
  followers: string[];
  userFollows: string[];
  avatars: string[];
  name: string;
  surname: string;
}

export enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
}
