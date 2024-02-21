import { TagRepository } from "../repository";
import { getAll } from "../repositoryMethods/getAll";
import { getByPrefix } from "../repositoryMethods/getByPrefix";

export const get = async function (this: TagRepository, prefix?: string) {
  if (prefix) {
    return getByPrefix(prefix);
  } else {
    return getAll();
  }
};
