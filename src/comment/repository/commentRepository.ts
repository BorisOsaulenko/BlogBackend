import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { Comment } from "../comment";

export class CommentRepository {
  static getById = async (id: string): Promise<Comment | null> => {
    return await Mongo.comments().findOne({ _id: new ObjectId(id) }, { projection: { _id: 0 } });
  };

  static getByPostId = async (postId: string): Promise<Comment[] | null> => {
    return await Mongo.comments()
      .find({ postId }, { projection: { _id: 0 } })
      .toArray();
  };

  static create = async (comment: Comment): Promise<void> => {
    await Mongo.comments().insertOne(comment);
  };

  static update = async (id: string, comment: Partial<Comment>): Promise<void> => {
    await Mongo.comments().updateOne({ _id: new ObjectId(id) }, { $set: { ...comment, updatedAt: Date.now() } });
  };

  static delete = async (id: string): Promise<void> => {
    await Mongo.comments().deleteOne({ _id: new ObjectId(id) });
  };
}
