import { CustomError } from "../../../customError/error";
import { checkCredentials } from "../../utils/checkCredentials";

export const login = async (email: string, password: string) => {
  const user = await checkCredentials(email, password);
  if (!user) throw new CustomError(401, "Invalid credentials");

  return user;
};
