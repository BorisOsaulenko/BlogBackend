import { CustomError } from "../../../customError/error";
import { Mongo } from "../../../mongo";
import { getUserByEmail } from "../../repository/getUserByEmail";

export const activation = async (code: string, email: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new CustomError(400, "User not found");
  if (user.activationNumber !== Number(code))
    throw new CustomError(400, "Invalid activation code");

  await Mongo.users().updateOne(
    { email },
    { $set: { isActive: true }, $unset: { activationNumber: 1 } }
  );
  return user;
};
