import { Response, Request, Router, NextFunction } from "express";
import { UserActivityService } from "../service/service";

export class UserController {
  public router = Router();
  private userActivityService: UserActivityService;
  constructor(userActivityService: UserActivityService) {
    this.userActivityService = userActivityService;
    this.router.get("/userActivity", this.get);
    this.router.put("/userActivity/followProfile", this.toggleProfileFollow);
    this.router.put("/userActivity/likePost", this.togglePostLike);
    this.router.put("/userActivity/dislikePost", this.togglePostDislike);
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { userId, userEmail } = req.query;

    let userActivity;
    if (userId) {
      userActivity = await this.userActivityService.getById(
        userId as string,
        token
      );
    } else if (userEmail) {
      userActivity = await this.userActivityService.getByEmail(
        userEmail as string,
        token
      );
    } else {
      res.status(400).json("user email is required");
    }
    res.json(userActivity);
  };

  toggleProfileFollow = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { profileId } = req.body;

    await this.userActivityService.toggleProfileFollow(profileId, token);
  };

  togglePostLike = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { postId } = req.body;

    await this.userActivityService.togglePostLike(postId, token);
  };

  togglePostDislike = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { postId } = req.body;

    await this.userActivityService.togglePostDislike(postId, token);
  };
}
