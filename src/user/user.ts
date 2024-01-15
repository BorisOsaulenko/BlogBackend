export interface User {
  email: string;
  password: string;
  roles: Role[];
  createdAt: Date;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
