import { Response, Request, Router, NextFunction } from "express";
import { commentRequests } from "./requests/commentRequests";
import { CommentService } from "../service/service";

export class CommentController {
  public router = Router();
  private commentService: CommentService;
  constructor(commentService: CommentService) {
    this.commentService = commentService;

    this.router.post("/comment", this.create);
    this.router.patch("/comment", this.update);
    this.router.delete("/profile", this.delete);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { postId, content } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const comment = await this.commentService.create(postId, content, token);
    res.json(comment);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id, content } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const comment = await this.commentService.update(id, content, token);
    res.json(comment);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const comment = await this.commentService.delete(id, token);
    res.json(comment);
  };
}
