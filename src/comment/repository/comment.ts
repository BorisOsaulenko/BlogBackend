import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { Comment } from "../comment";

export class CommentRepository {
  constructor() {}

  static getCommentById = (id: string): Promise<Comment | null> => {
    return Mongo.comments().findOne(
      { _id: new ObjectId(id) },
      { projection: { _id: 0 } }
    );
  };

  static getCommentsByPostId = (postId: string): Promise<Comment[] | null> => {
    return Mongo.comments()
      .find({ postId }, { projection: { _id: 0 } })
      .toArray();
  };

  static create = (comment: Comment): void => {
    Mongo.comments().insertOne(comment);
  };

  static deleteComment = (id: string): void => {
    Mongo.comments().deleteOne({ _id: new ObjectId(id) });
  };
}
