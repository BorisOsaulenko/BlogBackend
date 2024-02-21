import { get } from "./repositoryMethods/get";
import { getAll } from "./repositoryMethods/getAll";
import { getByPrefix } from "./repositoryMethods/getByPrefix";

export class TagRepository {
  public get = get;
  public getAll = getAll;
  public getByPrefix = getByPrefix;
}
