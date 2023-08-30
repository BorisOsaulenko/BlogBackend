import { Response, Request, Router, NextFunction } from "express";
import { Mongo } from "../mongo";
import HttpException from "../error/error";
import { TagService } from "./tag.service";
import { TagRepository } from "./tag.repository";

export class TagController {
  public router = Router();

  constructor() {
    this.router.post("/tags/create", this.createTag);
    this.router.get("/tags/get", this.getTags);
    this.router.delete("/tags/delete", this.deleteTag);
  }

  getTags = async (req: Request, res: Response, next: NextFunction) => {
    res.json(await TagRepository.getTags());
  };

  createTag = async (req: Request, res: Response, next: NextFunction) => {
    res.json(await TagService.createTag(req.body.title));
  };

  deleteTag = async (req: Request, res: Response, next: NextFunction) => {
    res.json(await TagService.deleteTag(req.body.title));
  };
}
