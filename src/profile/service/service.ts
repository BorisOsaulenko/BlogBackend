import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deleteProfile } from "./serviceMethods/delete";
import { get } from "./serviceMethods/get";

export class ProfileService {
  public create = create;
  public update = update;
  public get = get;
  public delete = deleteProfile;
};
