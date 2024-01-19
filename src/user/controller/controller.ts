import { Response, Request, Router, NextFunction } from "express";
import { UserService } from "../service/service";
import { userRequests } from "./requests/userRequests";
import jwt from "jsonwebtoken";

export class UserController {
  public router = Router();

  constructor() {
    this.router.post("/user", this.createNewUser);
    this.router.get("/user", this.login);
    this.router.patch("/user", this.update);
    this.router.delete("/user", this.delete);
    this.router.get("/activation", this.activation);
  }
  createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await userRequests.registerRequest.parseAsync({
      email,
      password,
    });

    await UserService.register(user);
    res.status(200).json({ toastMessage: "Email was sent" });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.query;

    const credentials = userRequests.loginRequest.parse({ email, password });
    const user = await UserService.login(
      credentials.email,
      credentials.password
    );

    res.json(jwt.sign(user, process.env.JWT_SECRET as string));
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    const newCredentials = await userRequests.updateRequest.parseAsync(
      req.body
    );

    const user = await UserService.update(token, newCredentials);
    res.json(user);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    const user = await UserService.deleteUser(token);
    res.removeHeader("authorization");
    res.json(user);
  };

  activation = async (req: Request, res: Response, next: NextFunction) => {
    const { email, code } = req.query;

    const user = await UserService.activation(code as string, email as string);
    res
      .header(
        "authorization",
        `Bearer ${jwt.sign(user, process.env.JWT_SECRET as string)}`
      )
      .redirect("/");
  };
}
