export interface User {
  email: string;
  password: string;
  roles: Role[];
  sponsors: string[]; // user is sponsoring, not being sponsored by
  createdAt: Date;
}

export enum Role {
  USER = "USER",
  SPONSOR = "SPONSOR",
  ADMIN = "ADMIN",
}
