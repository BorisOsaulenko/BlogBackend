import { Response, Request, Router, NextFunction } from "express";
import { profileRequests } from "./requests/profileRequests";
import { ProfileService } from "../service/service";

export class ProfileController {
  public router = Router();
  private profileService: ProfileService;
  constructor(profileService: ProfileService) {
    this.profileService = profileService;
    this.router.post("/profile", this.create);
    this.router.get("/profile", this.get);
    this.router.patch("/profile", this.update);
    this.router.delete("/profile", this.delete);
  }
  create = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const profile = await profileRequests.create.parseAsync(req.body);
    const createdProfile = await this.profileService.create(token, profile);
    res.json(createdProfile);
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { nickName, email } = req.query;

    const publicPartOfProfile = await this.profileService.get(nickName as string, email as string);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const profile = profileRequests.update.parse(req.body);
    const updatedProfile = await this.profileService.update(profile, token);
    res.json(updatedProfile);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const deletedProfile = await this.profileService.delete(token);
    res.json(deletedProfile);
  };
}
