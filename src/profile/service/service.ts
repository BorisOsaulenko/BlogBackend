import { create } from "./serviceMethods/create";
import { update } from "./serviceMethods/update";
import { deleteProfile } from "./serviceMethods/delete";

export class ProfileService { 
    public create = create; 
    public update = update; 
    public delete = deleteProfile 
};
