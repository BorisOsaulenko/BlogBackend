import { CustomError } from "../../customError/error";
import { checkCredentials } from "../../utils/checkCredentials";
import { validateAuthTokenSignature } from "../../utils/validateAuthTokenSignature";
import { getAll } from "./getAll";
import { getByPrefix } from "./getByPrefix";

export const get = async (prefix?: string, token?: string) => {
  if (!token) throw new CustomError(401, "Unauthorized");
  const user = await validateAuthTokenSignature(token);

  if (prefix) {
    return getByPrefix(prefix);
  } else {
    return getAll();
  }
};
