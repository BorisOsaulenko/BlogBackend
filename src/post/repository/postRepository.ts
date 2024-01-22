import { ObjectId, WithId } from "mongodb";
import { Mongo } from "../../mongo";
import { Post } from "../post";
import { generateMongoFilter, mongoFilter } from "./getByFilter/mongoFilter";
import { sortByEnum } from "../controller/requests/filter";
import { sort } from "./getByFilter/sort";
import { User } from "../../user/user";
import { accessManager } from "./getByFilter/accessManager";

export interface postFilter {
  authorName?: string;
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

  static getPostById = async (id: string): Promise<Post | null> => {
    return await Mongo.posts().findOne({ _id: new ObjectId(id) });
  };

  static getPostsByAuthor = async (name: string): Promise<Post[]> => {
    return await Mongo.posts().find({ authorName: name }).toArray();
  };

  static getPostsByDates = async (dateFrom: number, dateTo: number): Promise<Post[]> => {
    return await Mongo.posts()
      .find({ posted: { $gte: dateFrom, $lte: dateTo } })
      .toArray();
  };

  static getPostsByTags = async (tags: string[]): Promise<Post[]> => {
    return await Mongo.posts()
      .find({ tags: { $in: tags } })
      .toArray();
  };

  static getPostsByFilter = async (user: User, filter: postFilter): Promise<WithId<Post>[]> => {
    const { authorName, tags, dateFrom, dateTo, sortBy } = filter;
    const mongoFilter: mongoFilter = generateMongoFilter(tags, authorName, dateFrom, dateTo);
    const posts = await Mongo.posts().find(mongoFilter, { limit: 1000 }).toArray();
    return sort(accessManager(user, posts), sortBy || sortByEnum.popular);
  };
}
