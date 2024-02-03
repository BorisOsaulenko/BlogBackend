import { ObjectId, WithId } from "mongodb";
import { Mongo } from "../../mongo";
import { Post } from "../post";
import { generateMongoFilter, mongoFilter } from "./getByFilter/mongoFilter";
import { sortByEnum } from "../controller/requests/filter";
import { sort } from "./getByFilter/sort";
import { User } from "../../user/user";
import { checkIsUserAllowedUnderPost } from "../../utils/checkIsUserAllowedUnderPost";

export interface postFilter {
  authorNickName?: string;
  tags?: string[];
  dateFrom?: number;
  dateTo?: number;
  sortBy?: sortByEnum;
}

export class PostRepository {
  static create = async (post: Post): Promise<void> => {
    await Mongo.posts().insertOne(post);
  };

  static update = async (id: string, post: Partial<Post>): Promise<void> => {
    await Mongo.posts().updateOne({ _id: new ObjectId(id) }, { $set: post });
  };

  static delete = async (id: string): Promise<void> => {
    await Mongo.posts().deleteOne({ _id: new ObjectId(id) });
  };

  static getById = async (id: string): Promise<Post | null> => {
    return await Mongo.posts().findOne({ _id: new ObjectId(id) });
  };

  static getByAuthor = async (nickName: string): Promise<Post[]> => {
    return await Mongo.posts().find({ authorNickName: nickName }).toArray();
  };

  static getByDates = async (dateFrom: number, dateTo: number): Promise<Post[]> => {
    return await Mongo.posts()
      .find({ posted: { $gte: dateFrom, $lte: dateTo } })
      .toArray();
  };

  static getByTags = async (tags: string[]): Promise<Post[]> => {
    return await Mongo.posts()
      .find({ tags: { $in: tags } })
      .toArray();
  };

  static getByFilter = async (user: User, filter: postFilter): Promise<WithId<Post>[]> => {
    const { authorNickName, tags, dateFrom, dateTo, sortBy } = filter;
    const mongoFilter: mongoFilter = generateMongoFilter(tags, authorNickName, dateFrom, dateTo);
    let posts = await Mongo.posts().find(mongoFilter, { limit: 1000 }).toArray();
    posts = posts
      .map((post) => (checkIsUserAllowedUnderPost(user, post) ? post : null))
      .filter((p) => p !== null) as WithId<Post>[]; //only posts that user is allowed to see
    posts = sort(posts, sortBy || sortByEnum.popular);
    return posts.map((post) => {
      const { allowedUsers, blockedUsers, ...publicPart } = post;
      return publicPart;
    });
  };
}
