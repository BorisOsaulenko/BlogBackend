import { ZodError } from "zod";
import HttpException from "../../error/error";
import { Mongo } from "../../mongo";
import { followRequest } from "../zodRequests/followRequest";

export const followUser = async (followingUser: string, userToBeFollowed: string) => {
  try {
    await followRequest.parseAsync({ followingUser, userToBeFollowed });
  } catch (error) {
    throw new HttpException(400, (error as ZodError).issues[0].message);
  }

  const mongoResponse_followingUser = await Mongo.users().updateOne(
    { email: followingUser },
    { $addToSet: { userFollows: userToBeFollowed } }
  );
  const mongoResponse_userToBeFollowed = await Mongo.users().updateOne(
    { email: userToBeFollowed },
    { $addToSet: { followers: followingUser } }
  );

  if (
    mongoResponse_followingUser.modifiedCount === 0 ||
    mongoResponse_userToBeFollowed.modifiedCount === 0
  )
    throw new HttpException(400, "You are already following this user");

  return { message: "Now you are following this user" };
};
