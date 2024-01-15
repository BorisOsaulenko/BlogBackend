import { Response, Request, Router, NextFunction } from "express";
import { UserService } from "../service/UserService";
import { loginRequest } from "./zodRequests/login";
import { registerRequest } from "./zodRequests/register";
import { updateRequest } from "./zodRequests/update";

export class UserController {
  public router = Router();

  constructor() {
    this.router.post("/user", this.createNewUser);
    this.router.get("/user", this.login);
    this.router.patch("/user", this.update);
    this.router.delete("/user", this.delete);
  }
  createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await registerRequest.parseAsync({
      email,
      password,
    });

    const newUser = await UserService.register(user);
    res.json(newUser);
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.query;

    const credentials = loginRequest.parse({ email, password });
    const user = await UserService.login(
      credentials.email,
      credentials.password
    );
    res.json(user);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, update } = req.body;
    const newCredentials = await updateRequest.parseAsync({
      email: update.email,
      password: update.password,
    });

    const user = await UserService.update(email, password, newCredentials);
    res.json(user);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await UserService.deleteUser(email, password);
    res.json(user);
  };
}
