import { WithId } from "mongodb";
import { Credentials, Role, User } from "../../../user/user";

export const testUsers: WithId<User>[] = [
  // after inserting users, mongo will assign random _id
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
] as unknown as WithId<User>[]; // after inserting users, mongo will assign random _id

export const updates: Partial<User>[] = [
  // repository allows all parameters to be changed. The check is in the service
  {
    email: "email5@omega.com",
    activationNumber: 3000001,
    isActive: true,
  },
  {
    password: "password_secure_omega6",
    roles: [Role.ADMIN],
    isActive: true, // those fields are updated in the tests, but will not be as the service dont allow them
  },
  {
    email: "email7@omega.com",
    roles: [Role.USER],
    activationNumber: 5000001,
  },
  {
    email: "email8@omega.com",
    password: "password_secure_omega8",
    roles: [Role.SPONSOR],
    isActive: true,
  },
];
