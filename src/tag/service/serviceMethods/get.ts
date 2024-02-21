import { TagService } from "../service";

export const get = async function (
  this: TagService,
  prefix?: string,
  keyword?: string,
  token?: string
) {
  if (prefix) {
    return this.tagRepository.getByPrefix(prefix);
  } else if (keyword) {
    // return this.tagRepository.getByKeyword(keyword);
  } else {
    return this.tagRepository.get();
  }
};
