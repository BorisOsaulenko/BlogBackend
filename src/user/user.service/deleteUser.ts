import { ZodError } from "zod";
import HttpException from "../../error/error";
import { Mongo } from "../../mongo";
import { UserRepo } from "../user.repository";
import { deleteRequest } from "../zodRequests/deleteRequest";

export const deleteUser = async (email: string, password: string) => {
  try {
    await deleteRequest.parseAsync({ email, password });
  } catch (error) {
    throw new HttpException(400, (error as ZodError).issues[0].message);
  }

  await Mongo.users().updateMany(
    { followers: { $in: [email] } },
    { $pull: { followers: email, userFollows: email } }
  );
  if ((await Mongo.users().deleteOne({ email: email, password: password })).deletedCount === 1)
    return { message: "Deleted successfully" };
};
