import { Response, Request, Router, NextFunction } from "express";
import { profileRequests } from "./requests/profileRequests";
import { ProfileService } from "../service/service";
import { profileRepository } from "../repository/profileRepository";

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
    const { name, email } = req.query;
    const profile =
      (await profileRepository.getByName(name as string)) || (await profileRepository.getByEmail(email as string));
    res.json(profile);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const profile = profileRequests.update.parse(req.body);
    const updatedProfile = await this.profileService.update(token, profile);
    res.json(updatedProfile);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const deletedProfile = await this.profileService.delete(token);
    res.json(deletedProfile);
  };
}
