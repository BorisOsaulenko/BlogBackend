import { getProfileByEmail } from "../../repository/getProfileByEmail";
import { getProfileByName } from "../../repository/getProfileByName";
import { getProfileById } from "../../repository/getProfileById";

export const get = async (id: string, name: string, email: string) => {
  const profile =
    (await getProfileById(id)) || //id highest priority
    (await getProfileByName(name)) ||
    (await getProfileByEmail(email));

  const { userId, followers, following, createdAt, _id, ...publicPart } =
    profile || {};

  return publicPart;
};
