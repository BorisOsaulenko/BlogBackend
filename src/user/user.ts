import { Document } from "mongodb";

export interface User {
  email: string;
  password: string;
  type: Type[];
  name: string;
  surname: string;
  avatars: string[];
}

export enum Type {
  USER = "USER",
  ADMIN = "ADMIN",
}
