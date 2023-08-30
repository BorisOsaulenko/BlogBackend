import { ZodError } from "zod";
import HttpException from "../../error/error";
import { Mongo } from "../../mongo";
import { changePasswordRequest } from "../zodRequests/changeRequest";

export const changePassword = async (
  email: string,
  previousPassword: string,
  newPassword: string
) => {
  try {
    await changePasswordRequest.parseAsync({ email, previousPassword, newPassword });
  } catch (error) {
    throw new HttpException(400, (error as ZodError).issues[0].message);
  }

  if (
    (
      await Mongo.users().updateOne(
        { email: email, password: previousPassword },
        { $set: { password: newPassword } }
      )
    ).modifiedCount === 1
  )
    return { message: "Password changed successfully" };
};
