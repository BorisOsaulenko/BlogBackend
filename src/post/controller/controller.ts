import { Response, Request, Router, NextFunction } from "express";
import { PostService } from "../service/service";
import { postRequests } from "./requests/postRequests";

export class PostController {
  public router = Router();
  private postService: PostService;
  constructor(postService: PostService) {
    this.postService = postService;

    this.router.post("/post", this.create);
    this.router.get("/post/:paginationIdx", this.get);
    this.router.patch("/post", this.update);
    this.router.delete("/post", this.delete);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const post = postRequests.create.parse(req.body);
    const createdPost = await this.postService.create(post, token);
    res.json(createdPost);
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { tags, authorNickName, posted, sortBy } = req.query;
    const { paginationIdx } = req.params;

    const filter = postRequests.filter.parse({
      tags,
      authorNickName,
      posted: (posted as string[])?.map((p) => Number(p)), //timestamp
      sortBy,
    });

    const posts = await this.postService.getByFilter(filter, token);

    res.json(posts.slice(Number(paginationIdx) * 20, Number(paginationIdx) * 20 + 20));
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const post = postRequests.update.parse(req.body);
    const updatedPost = await this.postService.update(postId, post, token);
    res.json(updatedPost);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const deletedPost = await this.postService.delete(postId, token);
    res.json(deletedPost);
  };
}
