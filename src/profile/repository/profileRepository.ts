import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { Profile } from "../profile";
import { getById } from "./repoMethods/gets/byId";
import { getByNickName } from "./repoMethods/gets/byNickName";
import { update } from "./repoMethods/update";
import { getByUserId } from "./repoMethods/gets/byUserId";
import { addFollower } from "./repoMethods/addFollower";
import { removeFollower } from "./repoMethods/removeFollower";
import { create } from "./repoMethods/create/create";

export class ProfileRepository {
  public create = create.bind(this);

  public getById = getById.bind(this);
  public getByNickName = getByNickName.bind(this);
  public getByUserId = getByUserId.bind(this);
  public update = update.bind(this);

  public addFollower = addFollower.bind(this);
  public removeFollower = removeFollower.bind(this);

  public async deleteById(id: string): Promise<void> {
    await Mongo.profiles().deleteOne({ _id: new ObjectId(id) });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await Mongo.profiles().deleteOne({ userId });
  }

  public async deleteByNickName(nickName: string): Promise<void> {
    await Mongo.profiles().deleteOne({ nickName });
  }
}
