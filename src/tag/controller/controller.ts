import { Request, Response, Router, NextFunction } from "express";
import { get } from "../repository/repositoryMethods/get";
import { TagService } from "../service/service";

export class TagController {
  public router = Router();
  private tagService: TagService;

  constructor(tagService: TagService) {
    this.tagService = tagService;

    this.router.post("/tag", this.create);
    this.router.get("/tag", this.get);
    this.router.patch("/tag", this.update);
    this.router.delete("/tag", this.delete);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    const createdTag = await this.tagService.create(content, token);
    res.json(createdTag);
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { prefix } = req.query;

    const tags = await this.tagService.get(prefix as string, token);
    res.json(tags);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { id, content } = req.body;
    const update = this.tagService.update(id, content, token);
    res.json(update);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { id } = req.body;
    const deletedTag = await this.tagService.delete(id, token);
    res.json(deletedTag);
  };
}
