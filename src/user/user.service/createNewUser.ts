import { ZodError } from "zod";
import HttpException from "../../error/error";
import { Mongo } from "../../mongo";
import { User, UserType } from "../user";
import { createRequest } from "../zodRequests/createRequest";
var validator = require("email-validator");

export const createNewUser = async (
  userParams: Omit<User, "followers" | "userFollows" | "type">
) => {
  try {
    await createRequest.parseAsync(userParams);
  } catch (error) {
    throw new HttpException(400, (error as ZodError).issues[0].message);
  }

  if (
    (
      await Mongo.users().insertOne({
        ...userParams,
        followers: [],
        userFollows: [],
        type: [UserType.USER],
      })
    ).acknowledged
  )
    return { message: "Sign up successfull" };
  else throw new HttpException(400, "Wrong parameters provided");
};
