import { Mongo } from "../../../mongo";

export const getAll = async () => {
  const tags = await Mongo.tags().find().toArray();
  return tags;
};
