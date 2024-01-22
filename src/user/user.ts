export interface User {
  email: string;
  password: string;
  roles: Role[];
  sponsors: string[]; // user is sponsoring, not being sponsored by
  activationNumber: number;
  isActive: boolean;
  createdAt: Date;
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

// test for github actions. Pray 2 it to work