import { Response, Request, Router, NextFunction } from "express";
import { commentRequests } from "./requests/commentRequests";
import { CommentService } from "../service/commentService";

export class CommentController {
  public router = Router();
  constructor() {
    this.router.post("/comment", this.create);
    // this.router.get("/profile", this.get);
    // this.router.patch("/profile", this.update);
    // this.router.delete("/profile", this.delete);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, postId, content } = req.body;
    const comment = CommentService.create(email, password, postId, content);
    res.json(comment);
  };
}
