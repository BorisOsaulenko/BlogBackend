import { Response, Request, Router, NextFunction } from "express";
import { login } from "./user.service/login";
import { createNewUser } from "./user.service/createNewUser";
import { updateProfile } from "./user.service/updateProfile";
import { deleteUser } from "./user.service/deleteUser";
import { followUser } from "./user.service/followUser";
import { changePassword } from "./user.service/changePassword";

export class UserController {
  public router = Router();

  constructor() {
    this.router.get("/user/login", this.login);
    this.router.post("/user/auth", this.createNewUser);
    this.router.patch("/user/follow", this.followUser);
    this.router.patch("/user/profile", this.updateProfile);
    this.router.patch("/user/password", this.changePassword);
    this.router.delete("/user/delete", this.deleteUser);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.query;
    res.json(await login(email as string, password as string));
    // logged in account is stored on the client side, this is just checking credentials
  };

  createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, type, avatars, name, surname } = req.body;
    res.json(
      await createNewUser({
        email,
        password,
        avatars,
        name,
        surname,
      })
    );
  };

  followUser = async (req: Request, res: Response, next: NextFunction) => {
    const { following, followed } = req.body;
    res.json(await followUser(following, followed));
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, avatars, name, surname } = req.body;
    res.json(await updateProfile(email, password, avatars, name, surname));
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, previousPassword, newPassword } = req.body;
    res.json(await changePassword(email, previousPassword, newPassword));
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    res.json(await deleteUser(email, password));
  };
}
