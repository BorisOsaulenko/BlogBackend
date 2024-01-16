import { Response, Request, Router, NextFunction } from "express";
import { profileRequests } from "./requests/profileRequests";
import { ProfileService } from "../service/service";
import { getProfileByEmail } from "../repository/getProfileByEmail";

export class ProfileController {
  public router = Router();
  constructor() {
    this.router.post("/profile", this.create);
    this.router.get("/profile", this.get);
    this.router.patch("/profile", this.update);
    this.router.delete("/profile", this.delete);
  }
  create = async (req: Request, res: Response, next: NextFunction) => {
    //todo: unique profile name
    const { email, password } = req.body;

    const profile = profileRequests.create.parse(req.body);
    const createdProfile = await ProfileService.create(
      email,
      password,
      profile
    );
    res.json(createdProfile);
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query;
    const profile = await getProfileByEmail(email as string);
    res.json(profile);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const profile = profileRequests.update.parse(req.body);
    const updatedProfile = await ProfileService.update(
      email,
      password,
      profile
    );
    res.json(updatedProfile);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.query;
    console.log(email, password);

    const deletedProfile = await ProfileService.deleteProfile(
      email as string,
      password as string
    );
    res.json(deletedProfile);
  };
}
