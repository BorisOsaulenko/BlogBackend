import { Mongo } from "../../mongo";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { UserController } from "../../user/controller/controller";
import { mockedUserService } from "./mockedService";
import jwt, { Jwt } from "jsonwebtoken";
dotenv.config({ path: "./.test.env" });

const email = "email@example.com";
const password = "SeCuRe_PaSsW0Rd";
let token: string = "someToken.someData.someOtherData";

const next = jest.fn();
const res = { json: jest.fn() };
const userController = new UserController(mockedUserService);

describe("crud user", () => {
  beforeAll(() => {
    jest.spyOn(jwt, "sign").mockReturnValue(token as unknown as void);
    Mongo.connect(process.env.DB_URL!).then(() => Mongo.users().deleteMany());
  });
  afterAll(() => {
    Mongo.disconnect();
    jest.clearAllMocks();
  });

  it("create new user", async () => {
    const req = { body: { email, password } };
    await userController.createNewUser(
      req as unknown as Request,
      res as unknown as Response,
      next
    );
    expect(res.json).toHaveBeenCalledWith();
  });

  it("login", async () => {
    const req = { query: { email, password } };
    await userController.login(
      req as unknown as Request,
      res as unknown as Response,
      next
    );
    expect(res.json).toHaveBeenCalledWith(token);
  });
});

export { email, password };
