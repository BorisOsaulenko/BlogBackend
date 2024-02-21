import { Mongo } from "../../../mongo";

export const getByPrefix = async (prefix: string) => {
  const tags = await Mongo.tags()
    .find({ content: { $regex: prefix } })
    .toArray();
  return tags;
};
