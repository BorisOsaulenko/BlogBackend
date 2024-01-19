import { checkCredentials } from "../../../utils/checkCredentials";

export const login = async (email: string, password: string) => {
  const user = await checkCredentials(email, password);

  return user;
};
