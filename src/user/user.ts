import { Document } from "mongodb";

export interface User {
  email: string;
  password: string;
  type: Type[];
  followers: User[];
  avatars: string[];
  name: string;
  surname: string;
}

export enum Type {
  USER = "USER",
  ADMIN = "ADMIN",
}
