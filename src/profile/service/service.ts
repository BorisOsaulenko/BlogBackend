import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deleteProfile } from "./serviceMethods/delete";
import { get } from "./serviceMethods/get";

export const ProfileService = { create, update, deleteProfile, get };
