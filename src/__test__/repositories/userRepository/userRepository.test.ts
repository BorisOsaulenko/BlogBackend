import { Mongo } from "../../../mongo";
import env from "../../../enviroment";
import { testUsers } from "./testUsers";
import { UserRepository } from "../../../user/repository/userRepository";
import { User } from "../../../user/user";

describe("user repository test", () => {
  beforeAll(async () => {
    await Mongo.connect(env.DB_URL);
    await Mongo.users().deleteMany();
  });
  afterAll(async () => {
    await Mongo.users().deleteMany(); // await for guarantee that deletes before disconnect
    Mongo.disconnect();
    jest.clearAllMocks();
  });

  it("create users", async () => {
    for (const user of testUsers) {
      await UserRepository.create(user);
    }

    const users: User[] = await Mongo.users().find().toArray();
    expect(users).toEqual(testUsers);
  });
});
