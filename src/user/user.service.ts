import { NextFunction } from "express-serve-static-core";
import HttpException from "../error/error";
import { Mongo } from "../mongo";
import { User } from "./user";
import { UserRepo } from "./user.repository";
import { Response, Request } from "express";
var validator = require("email-validator");

export class UserService {
  public static async createNewUser(userParams: User) {
    if (!(validator.validate(userParams.email) && userParams.password !== ""))
      throw new HttpException(400, "Bad request");
    if (!(await Mongo.users().findOne({ email: userParams.email })))
      return await Mongo.users().insertOne({ ...userParams });
    else
      throw new HttpException(
        400,
        "User with email " + userParams.email + " already exists"
      );
  }

  public static async login(
    email: string,
    password: string,
    res: Response,
    next: NextFunction
  ) {
    if (validator.validate(email) && password !== "") {
      const user = await UserRepo.getUserByEmail(email as string);

      if (user !== null && user.password === password) {
        res.json({ user: user });
      } else next(new HttpException(401, "Wrong password"));
    } else next(new HttpException(400, "Bad request"));
  }

  public static async delete(email: string, next: NextFunction) {
    return await Mongo.users().deleteOne({ email: email });
  }
}
