import { Response, Request, Router, NextFunction } from "express";
import { CommentService } from "../service/service";

export class CommentController {
  public router = Router();
  private commentService: CommentService;
  constructor(commentService: CommentService) {
    this.commentService = commentService;

    this.router.post("/comment", this.create);
    this.router.get("/comment", this.get);
    this.router.patch("/comment", this.update);
    this.router.delete("/comment", this.delete);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { postId, content } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const comment = await this.commentService.create(postId, content, token);
    res.json(comment);
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { postId, paginationIdx } = req.query;
    const comments = await this.commentService.get(postId as string, Number(paginationIdx));
    res.json(comments);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id, content } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const comment = await this.commentService.update(id, content, token);
    res.json(comment);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const token = req.headers.authorization?.split(" ")[1];
    const comment = await this.commentService.delete(id as string, token);
    res.json(comment);
  };
}
