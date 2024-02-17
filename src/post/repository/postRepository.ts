import { ObjectId, WithId } from "mongodb";
import { Mongo } from "../../mongo";
import { Post } from "../post";
import { generateMongoFilter, mongoFilter } from "./getByFilter/mongoFilter";
import { sortByEnum } from "../controller/requests/filter";

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

  static getByDates = async (
    dateFrom: number,
    dateTo: number
  ): Promise<Post[]> => {
    return await Mongo.posts()
      .find({ posted: { $gte: dateFrom, $lte: dateTo } })
      .toArray();
  };

  static getByTags = async (tags: string[]): Promise<Post[]> => {
    return await Mongo.posts()
      .find({ tags: { $in: tags } })
      .toArray();
  };

  static getByFilter = async (filter: postFilter): Promise<WithId<Post>[]> => {
    const mongoFilter: mongoFilter = generateMongoFilter(filter);
    return await Mongo.posts().find(mongoFilter, { limit: 1000 }).toArray();
  };
}
