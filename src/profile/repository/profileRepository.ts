import { ObjectId } from "mongodb";
import { Mongo } from "../../mongo";
import { Profile } from "../profile";
import { getById } from "./repoMethods/gets/byId";
import { getByNickName } from "./repoMethods/gets/byNickName";
import { getByEmail } from "./repoMethods/gets/byEmail";
import { update } from "./repoMethods/update";
import { UserRepository } from "../../user/repository/userRepository";

export class ProfileRepository {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async create(profile: Profile): Promise<void> {
    await Mongo.profiles().insertOne(profile);
  }
  public async createByEmail(
    profile: Omit<Profile, "userId">,
    email: string
  ): Promise<void> {
    const user = await this.userRepository.getByEmail(email);
    await Mongo.profiles().insertOne({ ...profile, userId: String(user?._id) });
  }

  public getById = getById;
  public getByNickName = getByNickName;
  public getByEmail = getByEmail;
  public update = update;

  public async addFollower(nickName: string, userEmail: string) {
    Mongo.profiles().updateOne(
      { nickName },
      {
        $push: {
          followers: userEmail,
        },
      }
    );
  }

  public async removeFollower(nickName: string, userEmail: string) {
    Mongo.profiles().updateOne(
      { nickName },
      {
        $pull: {
          followers: userEmail,
        },
      }
    );
  }

  public async deleteById(id: string): Promise<void> {
    await Mongo.profiles().deleteOne({ _id: new ObjectId(id) });
  }

  public async deleteByNickName(nickName: string): Promise<void> {
    await Mongo.profiles().deleteOne({ nickName });
  }

  public async deleteByEmail(email: string): Promise<void> {
    const user = await this.userRepository.getByEmail(email);
    await Mongo.profiles().deleteOne({ userId: String(user?._id) });
  }
}
