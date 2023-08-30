import { ObjectId } from "mongodb";
import { PostType } from "../post";
import { ZodError } from "zod";
import { TagService } from "../../Tag/tag.service";
import HttpException from "../../error/error";
import { Mongo } from "../../mongo";
import { updateRequest } from "../zodRequests.ts/updateRequest";

export const updatePost = async (id: string, newTags?: string[], newHeading?: string, newContent?: string, newImages?: string[], newType?: PostType) => {
  try {
    await updateRequest.parseAsync({
      id: id,
      newTags,
      newHeading,
      newContent,
      newImages,
      newType,
    });
  } catch (error) {
    throw new HttpException(400, (error as ZodError).issues[0].message);
  }

  const mongoResponse = await Mongo.posts().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...(newTags ? { tags: newTags } : {}), // updating only if requirements are ok
        ...(newHeading ? { heading: newHeading } : {}),
        ...(newContent ? { content: newContent } : {}),
        ...(newType ? { type: newType } : {}),
        ...(newImages ? { images: newImages } : {}),
      },
    }
  );

  if (mongoResponse.matchedCount === 0) throw new HttpException(400, "Post does not exists");
  if (mongoResponse.modifiedCount === 0) throw new HttpException(400, "You must change something before update");
  return { message: "Updated successfully" };
};
