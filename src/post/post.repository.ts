import { ObjectId } from "mongodb";
import { Mongo } from "../mongo";
import HttpException from "../error/error";
import { Post, PostType } from "./post";
import { getRequest } from "./zodRequests.ts/getRequest";
import { ZodError } from "zod";
import { UserType } from "../user/user";

export class PostRepo {
  public static async getPostById(id: string) {
    const posts = await Mongo.posts().findOne({ _id: new ObjectId(id) });

    return posts;
  }

  public static async getPosts(filter: {
    author?: string;
    tags?: string[];
    dateFrom?: Date;
    dateTo?: Date;
  }) {
    try {
      getRequest.parse(filter);
    } catch (error) {
      throw new HttpException(400, (error as ZodError).issues[0].message);
      // return (error as ZodError).issues;
    }

    const posts = await Mongo.posts()
      .find({
        type: PostType.PUBLIC,
        ...(filter.author ? { author: filter.author } : {}),
        ...(filter.tags ? { tags: { $all: filter.tags } } : {}),
        ...(filter.dateFrom && filter.dateTo
          ? { $gt: filter.dateFrom, $lt: filter.dateTo }
          : {}),
      })
      .toArray();

    if (posts.length === 0)
      throw new HttpException(
        400,
        "No posts found for your filters. Try to change them to see some posts"
      );
    return { message: "Showing results for your filter", posts };
  }

  // .filter(
  //   (post) => post.tags.filter((tag: string) => tags.includes(tag)).length
  // )
}
