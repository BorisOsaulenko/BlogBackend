import { z } from "zod";
import { UserRepo } from "../user.repository";

export const followRequest = z
  .object({
    followingUser: z
      .string()
      .email("Invalid email for following user")
      .refine(
        async (email) => await UserRepo.getUserByEmail(email),
        "Following user does not exist"
      ),
    userToBeFollowed: z
      .string()
      .email("Invalid email for followed user")
      .refine(
        async (email) => await UserRepo.getUserByEmail(email),
        "Followed user does not exist"
      ),
  })
  .refine(
    ({ followingUser, userToBeFollowed }) => followingUser !== userToBeFollowed,
    "Following user email must be different from followed user email"
  );
