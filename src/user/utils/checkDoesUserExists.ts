import { ObjectId } from "mongodb";
import { getUserByEmail } from "../repository/getUserByEmail";
import { getUserById } from "../repository/getUserById";

export const checkDoesUserExists = async (emailOrId: string) => {
  //check is string is mongo id:
  try {
    new ObjectId(emailOrId);
  } catch (error) {
    return !!(await getUserByEmail(emailOrId));
  }

  return !!(await getUserById(emailOrId));
};
