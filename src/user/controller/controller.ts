import { Response, Request, Router, NextFunction } from "express";
import { userRequests } from "./requests/userRequests";
import jwt from "jsonwebtoken";
import { UserService } from "../service/service";
import env from "../../enviroment";

export class UserController {
  public router = Router();
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
    this.router.post("/user", this.createNewUser);
    this.router.get("/user", this.login);
    this.router.patch("/user", this.update);
    this.router.delete("/user", this.delete);
  }
  createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body; //only email and password so user cannot create other data

    const user = await userRequests.registerRequest.parseAsync({
      email: email as string,
      password: password as string,
    });

    await this.userService.register(user);
    res.json();
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.query;

    const credentials = userRequests.loginRequest.parse({ email, password });
    const user = await this.userService.login(
      credentials.email,
      credentials.password
    );

    res.json(jwt.sign(user, env.JWT_SECRET));
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    const newCredentials = userRequests.updateRequest.parse(req.body);

    await this.userService.update(token, newCredentials);
    res.json();
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    const user = await this.userService.delete(token);

    res.json(user);
  };
}
