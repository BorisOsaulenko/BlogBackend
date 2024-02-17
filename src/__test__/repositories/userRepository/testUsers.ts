import { Role, User } from "../../../user/user";

export const testUsers: User[] = [
  {
    email: "email@example.com",
    password: "password1",
    roles: [Role.USER],
    createdAt: 1234567890,
    activationNumber: 1000000,
    isActive: true,
  },
  {
    email: "email2@example.com",
    password: "password2",
    roles: [Role.ADMIN, Role.SPONSOR],
    createdAt: 1234567891,
    activationNumber: 2000000,
    isActive: false,
  },
  {
    email: "email3@example.com",
    password: "password3",
    roles: [Role.USER, Role.SPONSOR],
    createdAt: 1234567892,
    activationNumber: 3000000,
    isActive: false,
  },
  {
    email: "email4@example.com",
    password: "password4",
    roles: [Role.ADMIN],
    createdAt: 1234567893,
    activationNumber: 4000000,
    isActive: false,
  },
];
