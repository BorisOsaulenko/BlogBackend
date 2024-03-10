import { Response, Request, Router, NextFunction } from "express";
import { UserActivityService } from "../service/service";

export class UserController {
  public router = Router();
  userActivityService: UserActivityService;
  constructor(userActivityService: UserActivityService) {
    this.userActivityService = userActivityService;
    this.router.get("/userActivity", this.get);
    this.router.put("/userActivity/followProfile", this.followProfile);
    this.router.put("/userActivity/likePost", this.likePost);
    this.router.put("/userActivity/dislikePost", this.dislikePost);
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const userActivity = await this.userActivityService.get(token);
    res.json(userActivity);
  };

  followProfile = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { profileId } = req.body;

    await this.userActivityService.followProfile(profileId, token);
  };

  likePost = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { postId } = req.body;

    await this.userActivityService.like(postId, token);
  };

  dislikePost = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { postId } = req.body;

    await this.userActivityService.dislike(postId, token);
  };
}
