import { Mongo } from "../../../mongo";
import env from "../../../enviroment";
import { testUsers, updates } from "./testData";
import { UserRepository } from "../../../user/repository/userRepository";
import { User } from "../../../user/user";
import { ObjectId } from "mongodb";

const userRepository = new UserRepository();

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
    for (let user of testUsers) {
      await userRepository.create(user);
    }

    const users: User[] = await Mongo.users().find().toArray();
    expect(users).toEqual(testUsers);
  });

  it("get users by id", async () => {
    for (let user of testUsers) {
      const userFromDb = await userRepository.getById(user._id.toString());
      expect(userFromDb).toEqual(user);
    }

    const userRandom1 = await userRepository.getById(new ObjectId().toString());
    const userRandom2 = await userRepository.getById(new ObjectId().toString());

    expect(userRandom1).toBeNull();
    expect(userRandom2).toBeNull();
  });

  it("get users by email", async () => {
    for (let user of testUsers) {
      const userFromDb = await userRepository.getByEmail(user.email);
      expect(userFromDb).toEqual(user);
    }
    // no more test users, so a few randoms should return null
    const userRandom1 = await userRepository.getByEmail("some randome emaile");
    const userRandom2 = await userRepository.getByEmail("random@email.com");

    expect(userRandom1).toBeNull();
    expect(userRandom2).toBeNull();
  });

  it("update users by id", async () => {
    for (let i = 0; i < updates.length; i++) {
      const user = testUsers[i];
      const update = updates[i];
      await userRepository.updateById(user._id.toString(), update);
      const userFromDb = await Mongo.users().findOne({
        _id: new ObjectId(user._id),
      });
      expect(userFromDb).toEqual({ ...user, ...update });
      // here we update to update, so it is higher priority
    }
  });

  it("update users by email", async () => {
    for (let i = 0; i < updates.length; i++) {
      const user = testUsers[i];
      const update = updates[i];
      await userRepository.updateByEmail(update.email || user.email, user); // back to original user
      const userFromDb = await Mongo.users().findOne({
        email: user.email,
      });
      expect(userFromDb).toEqual({ ...update, ...user });
      // here we update to user, so it is higher priority
    }
  });

  it("activation by id", async () => {
    for (let user of testUsers) {
      await Mongo.users().updateOne(
        { _id: new ObjectId(user._id) },
        { $set: { isActive: false } }
      );
    }

    for (let user of testUsers) {
      await userRepository.activateById(user._id.toString());
      const userFromDb = await Mongo.users().findOne({
        _id: new ObjectId(user._id),
      });
      expect(userFromDb?.isActive).toBeTruthy();
    }
  });

  it("activation by email", async () => {
    for (let user of testUsers) {
      await Mongo.users().updateOne(
        { email: user.email },
        { $set: { isActive: false } }
      );
    } // set all users to inactive

    for (let user of testUsers) {
      await userRepository.activateByEmail(user.email);
      const userFromDb = await Mongo.users().findOne({
        email: user.email,
      });
      expect(userFromDb?.isActive).toBeTruthy();
    }
  });

  it("delete users by id", async () => {
    await userRepository.deleteById(testUsers[0]._id.toString());
    await userRepository.deleteById(testUsers[1]._id.toString());

    const user0FromDb = await Mongo.users().findOne({
      _id: new ObjectId(testUsers[0]._id),
    });

    const user1FromDb = await Mongo.users().findOne({
      _id: new ObjectId(testUsers[1]._id),
    });

    expect(user0FromDb).toBeNull();
    expect(user1FromDb).toBeNull();
  });

  it("delete users by email", async () => {
    await userRepository.deleteByEmail(testUsers[2].email);
    await userRepository.deleteByEmail(testUsers[3].email);

    const user2FromDb = await Mongo.users().findOne({
      email: testUsers[0].email,
    });

    const user3FromDb = await Mongo.users().findOne({
      email: testUsers[1].email,
    });

    expect(user2FromDb).toBeNull();
    expect(user3FromDb).toBeNull();
  });
});