import { Response, Request, Router, NextFunction } from "express";
import { profileRequests } from "./requests/profileRequests";
import { ProfileService } from "../service/service";

export class ProfileController {
  public router = Router();
  constructor() {
    this.router.post("/profile", this.create);
    this.router.get("/profile", this.get);
    this.router.patch("/profile", this.update);
    this.router.delete("/profile", this.delete);
  }
  create = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const profile = await profileRequests.create.parseAsync(req.body);
    const createdProfile = await ProfileService.create(token, profile);
    res.json(createdProfile);
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, email } = req.query;
    const profile = await ProfileService.get(
      id as string,
      name as string,
      email as string
    );
    res.json(profile);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const profile = profileRequests.update.parse(req.body);
    const updatedProfile = await ProfileService.update(token, profile);
    res.json(updatedProfile);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const deletedProfile = await ProfileService.deleteProfile(token);
    res.json(deletedProfile);
  };
}
