import { Response, Request, Router, NextFunction } from "express";
import { createNewPost } from "./post.service/createNewPost";

import { updatePost } from "./post.service/updatePost";
import { deletePost } from "./post.service/deletePost";
import { PostRepo } from "./post.repository";
import { UserType } from "../user/user";
import { PostType } from "./post";

export class PostController {
  public router = Router();

  constructor() {
    this.router.post("/post/create", this.createNewPost);
    this.router.get("/post/get", this.getPosts);
    this.router.patch("/post/update", this.updatePost);
    this.router.delete("/post/delete", this.deletePost);
  }

  createNewPost = async (req: Request, res: Response, next: NextFunction) => {
    res.json(await createNewPost(req.body));
  };

  getPosts = async (req: Request, res: Response, next: NextFunction) => {
    res.json(await PostRepo.getPosts(req.query));
  };

  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const { id, heading, content, images, type, tags } = req.body;

    res.json(await updatePost(id, tags, heading, content, images, type));
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    res.json(await deletePost(req.body.id));
  };
}
