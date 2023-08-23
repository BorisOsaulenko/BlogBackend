import { Response, Request, Router, NextFunction } from "express";
import { UserService } from "./user.service";
import HttpException from "../error/error";
import { Type } from "./user";

export class UserController {
  public router = Router();

  constructor() {
    this.router.get("/user/login", this.login);
    this.router.post("/user/auth", this.createNewUser);
    this.router.delete("/user/delete", this.deleteUser);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.query;
    res.json(await UserService.login(email as string, password as string));
    // logged in account is stored on the client side, this is just checking credentials
  };

  createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const expectedFields = ["email", "password", "name", "avatars", "surname"];

    if (
      Object.values(req.body).every((x) => x !== "") &&
      expectedFields.every((field) => {
        return Object.keys(req.body).includes(field);
      })
    ) {
      const { email, password, avatars, name, surname } = req.body;

      res.json(
        await UserService.createNewUser({
          email: email as string,
          password: password as string,
          type: [Type.USER],
          followers: [],
          avatars: [...avatars],
          name: name,
          surname: surname,
        })
      );
    } else throw new HttpException(400, "Bad request");
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    res.json(await UserService.delete(req.body.email, req.body.password));
  };
}
