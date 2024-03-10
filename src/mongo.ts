import { Db, Document, MongoClient } from "mongodb";
import { User } from "./user/user";
import { Profile } from "./profile/profile";
import { Post } from "./post/post";
import { Comment } from "./comment/comment";
import { Tag } from "./tag/tag";
import { UserActivity } from "./userActivity/userActivity";

const users = "users";
const userActivity = "userActivity";
const profiles = "profiles";
const posts = "posts";
const comments = "comments";
const tags = "tags";

export class Mongo {
  private static client: MongoClient;
  public static mongo: Db;

  public static async connect(url: string): Promise<Db> {
    this.client = await MongoClient.connect(url);
    this.mongo = this.client.db();
    return this.mongo;
  }
  public static disconnect = () => this.client.close();
  public static userActivities = () =>
    Mongo.collection<UserActivity>(userActivity);
  public static users = () => Mongo.collection<User>(users);
  public static profiles = () => Mongo.collection<Profile>(profiles);
  public static posts = () => Mongo.collection<Post>(posts);
  public static comments = () => Mongo.collection<Comment>(comments);
  public static tags = () => Mongo.collection<Tag>(tags);
  private static collection = <T extends Document>(name: string) =>
    Mongo.mongo.collection<T>(name);
}
