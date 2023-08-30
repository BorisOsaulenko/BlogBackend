import { ZodError } from "zod";
import HttpException from "../../error/error";
import { Mongo } from "../../mongo";
import { updateRequest } from "../zodRequests/updateRequest";

export const updateProfile = async (
  email: string,
  password: string,
  avatars?: string[],
  name?: string,
  surname?: string
) => {
  try {
    await updateRequest.parseAsync({ email, password, avatars, name, surname });
  } catch (error) {
    throw new HttpException(400, (error as ZodError).issues[0].message);
  }

  const mongoResponse = await Mongo.users().updateOne(
    { email: email, password: password },
    {
      $set: {
        ...(avatars ? { avatars } : {}),
        ...(name ? { name } : {}),
        ...(surname ? { surname } : {}),
      },
    }
  );

  if (mongoResponse.matchedCount === 0) throw new HttpException(400, "Wrong password or email");
  if (mongoResponse.modifiedCount === 0)
    throw new HttpException(400, "This update is already up to date");

  return { message: "Updated successfully" };
};
