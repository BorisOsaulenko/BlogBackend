export interface User {
  email: string;
  password: string;
  roles: Role[];
  sponsors: string[]; // user is sponsoring, not being sponsored by
  following: { nickName: string; avatarURL: string }[]; // list of emails
  activationNumber: number;
  isActive: boolean;
  createdAt: Number;
  likedPosts: string[];
}

export interface Credentials {
  email: string;
  password: string;
}

export enum Role {
  USER = "USER",
  SPONSOR = "SPONSOR",
  ADMIN = "ADMIN",
}