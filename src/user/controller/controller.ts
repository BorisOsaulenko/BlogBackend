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
    this.router.put("/user/follow", this.follow);
    this.router.put("/user/unfollow", this.unfollow);
    this.router.put("/user/likePost", this.likePost);
    this.router.put("/user/unlikePost", this.unlikePost);
    this.router.get("/user/activation", this.activation);
  }
  createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

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
    const newCredentials = await userRequests.updateRequest.parseAsync(
      req.body
    );

    const user = await this.userService.update(token, newCredentials);
    res.json(user);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    const user = await this.userService.delete(token);
    res.removeHeader("authorization");
    res.json(user);
  };

  follow = async (req: Request, res: Response, next: NextFunction) => {
    const { profileNickName } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    await this.userService.follow(profileNickName, token);
    res.status(200).json();
  };

  unfollow = async (req: Request, res: Response, next: NextFunction) => {
    const { profileNickName } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    await this.userService.unfollow(profileNickName, token);
    res.status(200).json();
  };

  likePost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    await this.userService.likePost(postId, token);
    res.status(200).json();
  };

  unlikePost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    await this.userService.unlikePost(postId, token);
    res.status(200).json();
  };

  activation = async (req: Request, res: Response, next: NextFunction) => {
    const { email, code } = req.query;

    const user = await this.userService.activation(
      code as string,
      email as string
    );
    res.status(200).json(jwt.sign(user, env.JWT_SECRET));
  };
}
