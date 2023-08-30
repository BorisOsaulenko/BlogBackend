import { ZodError } from "zod";
import HttpException from "../../error/error";
import { Mongo } from "../../mongo";
import { Post } from "../post";
import { createRequest } from "../zodRequests.ts/createRequest";

export const createNewPost = async (postParams: Omit<Post, "createdAt">) => {
  try {
    console.log(await createRequest.parseAsync(postParams));
  } catch (error) {
    throw new HttpException(400, (error as ZodError).issues[0].message);
  }

  if (
    (
      await Mongo.posts().insertOne({
        ...postParams,
        views: 0,
        likes: 0,
        createdAt: new Date(),
      })
    ).acknowledged
  )
    return { message: "Posted successfully" };
  else throw new HttpException(400, "Bad request");
};
