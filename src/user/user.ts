export interface User {
  email: string;
  password: string;
  roles: Role[];

  activationNumber: number;
  isActive: boolean;
  createdAt: Number;
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
