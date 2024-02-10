import { Mongo } from "../../mongo";
import dotenv from "dotenv";
import { UserService } from "../../user/service/service";
import { Request, Response } from "express";
import { UserController } from "../../user/controller/controller";
dotenv.config({ path: "./.test.env" });

const email = "email@example.com";
const password = "SeCuRe_PaSsW0Rd";
let token: string;

const mockedUserService = new UserService();
mockedUserService.register = jest.fn().mockReturnValueOnce(Promise<void>);

const userController = new UserController(mockedUserService);

describe("test user", () => {
  beforeAll(() =>
    Mongo.connect(process.env.DB_URL!).then(() => Mongo.users().deleteMany())
  );
  afterAll(() => Mongo.disconnect());

  it("create new user", async () => {
    const req = { body: { email, password } };
    const res = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };
    const next = jest.fn();
    const result = await userController.createNewUser(
      req as unknown as Request,
      res as unknown as Response,
      next
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith();
  });
});
