import HttpException from "../error/error";
import { Mongo } from "../mongo";
import { TagRepository } from "./tag.repository";

export class TagService {
  public static async createTag(title: string) {
    if (title === undefined || title === "")
      throw new HttpException(400, "Title is required");

    if (await Mongo.tags().findOne({ title: title }))
      throw new HttpException(400, "Tag already exists");

    if ((await Mongo.tags().insertOne({ title: title })).acknowledged)
      return { message: "Tag created successfully" };
  }

  public static async deleteTag(title: string) {
    if (title === undefined || title === "")
      throw new HttpException(400, "Title is required");

    if ((await Mongo.tags().deleteOne({ title: title })).deletedCount)
      return { message: "Deleted successfully" };
    else throw new HttpException(400, "Tag does not exists");
  }

  public static async checkTag(title: string) {
    return (await TagRepository.getTags()).includes(title);
  }

  public static async checkTags(titles: string[]) {
    const tags = await TagRepository.getTags();

    const containsAllTags = titles.every((element) => {
      return tags.includes(element);
    });

    return containsAllTags;
  }
}
