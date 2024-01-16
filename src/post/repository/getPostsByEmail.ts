import { Mongo } from "../../mongo";
import { getUserByEmail } from "../../user/repository/getUserByEmail";
import { CustomError } from "../../customError/error";

export const getPostsByEmail = async (email: string, paginationIdx: number) => {
  const user = await getUserByEmail(email);
  if (!user) throw new CustomError(404, "User not found");

  return (
    await Mongo.posts()
      .find({ userId: String(user._id) })
      .toArray()
  ).slice(paginationIdx * 20, paginationIdx * 20 + 20);
};
