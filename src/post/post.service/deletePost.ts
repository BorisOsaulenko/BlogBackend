import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import HttpException from "../../error/error";

export const deletePost = async (id: string) => {
  if (
    (await Mongo.posts().deleteOne({ _id: new ObjectId(id) })).deletedCount == 0
  )
    throw new HttpException(400, `Post did not found`);
  return { message: "Deleted successfully" };
};
