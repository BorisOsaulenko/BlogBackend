import { NextFunction } from "express-serve-static-core";
import HttpException from "../responseSender/clientResponse";
import { Mongo } from "../mongo";
import { User } from "./user";
import { UserRepo } from "./user.repository";
import { Response, Request } from "express";
var validator = require("email-validator");

export class UserService {
  public static async createNewUser(userParams: User) {
    if (!(validator.validate(userParams.email) && userParams.password !== ""))
      throw new HttpException(400, "Bad request");
    if (await Mongo.users().findOne({ email: userParams.email }))
      throw new HttpException(
        400,
        "User with email " + userParams.email + " already exists"
      );
    if ((await Mongo.users().insertOne({ ...userParams })).acknowledged)
      return { status: 200, message: "Sign up successfull" };
  }

  public static async login(email: string, password: string) {
    if (!(validator.validate(email) && password !== ""))
      throw new HttpException(400, "Bad request");

    const user = await UserRepo.getUserByEmail(email);

    if (user === null)
      throw new HttpException(
        400,
        "User with email " + email + " does not exists"
      );

    if (user.password !== password)
      throw new HttpException(400, "Wrong password");

    return { status: 200, message: "Logged in successfully", user: user };
  }

  public static async delete(email: string, password: string) {
    if ((await UserRepo.getUserByEmail(email)) === null)
      throw new HttpException(
        400,
        "User with email " + email + " does not exists"
      );

    if ((await UserRepo.getUserByEmail(email))?.password !== password)
      throw new HttpException(400, "Wrong password");
    if (
      (await Mongo.users().deleteOne({ email: email, password: password }))
        .deletedCount !== 0
    )
      return { status: 200, message: "Deleted successfully" };
  }
}
