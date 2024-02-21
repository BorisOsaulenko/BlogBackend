import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { Comment } from "../comment";

export class CommentRepository {
  public getById = async (id: string): Promise<Comment | null> => {
    return await Mongo.comments().findOne({ _id: new ObjectId(id) });
  };

  public getByPostId = async (postId: string): Promise<Comment[] | null> => {
    return await Mongo.comments().find({ postId }).toArray();
  };

  public create = async (comment: Comment): Promise<void> => {
    await Mongo.comments().insertOne(comment);
  };

  public update = async (
    id: string,
    comment: Partial<Comment>
  ): Promise<void> => {
    await Mongo.comments().updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...comment, updatedAt: Date.now() } }
    );
  };

  public delete = async (id: string): Promise<void> => {
    await Mongo.comments().deleteOne({ _id: new ObjectId(id) });
  };
}
