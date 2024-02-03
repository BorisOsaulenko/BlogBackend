import { Mongo } from "../../mongo";
import dotenv from "dotenv";
import { UserService } from "../../user/service/service";
import { Request, Response } from "express";
import { UserController } from "../../user/controller/controller";
dotenv.config();

const email = "email@example.com";
const password = "SeCuRe_PaSsW0Rd";
let token: string;

const mockedUserService = new UserService();
mockedUserService.register = jest.fn().mockReturnValueOnce(Promise<void>);

const userController = new UserController(mockedUserService);

describe("test user", () => {
  beforeAll(() => Mongo.connect(process.env.DB_URL!).then(() => Mongo.users().deleteMany()));
  afterAll(() => Mongo.disconnect());

  it("create new user", async () => {
    const req = { body: { email, password } } as unknown as Request;
    const res = { status: jest.fn() } as unknown as Response;
    const next = jest.fn();
    const result = await userController.createNewUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    const user = await Mongo.users().findOne({ email });
    expect(user?.email).toBe(email);
  });
});
