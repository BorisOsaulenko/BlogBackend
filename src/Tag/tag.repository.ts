import { Mongo } from "../mongo";

export class TagRepository {
  public static async getTags() {
    return (await Mongo.tags().find().toArray()).map((tag) => tag.title);
  }
}
