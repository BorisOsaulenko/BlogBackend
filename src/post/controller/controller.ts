import { Response, Request, Router, NextFunction } from "express";
import { PostService } from "../service/service";
import { postRequests } from "./requests/postRequests";
import { getPostsByFilter } from "../repository/getPostsByFilter";

export class PostController {
  public router = Router();
  constructor() {
    this.router.post("/post", this.create);
    this.router.get("/post/:paginationIdx", this.get);
    this.router.patch("/post", this.update);
    this.router.delete("/post", this.delete);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const post = postRequests.create.parse(req.body);
    const createdPost = await PostService.create(email, password, post);
    res.json(createdPost);
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { tags, author, posted, sortBy } = req.query;
    const { paginationIdx } = req.params;

    const filter = postRequests.filter.parse({
      tags,
      author,
      posted,
      sortBy,
    });

    const posts = await getPostsByFilter(filter);

    res.json(
      posts.slice(Number(paginationIdx) * 20, Number(paginationIdx) * 20 + 20)
    );
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, postId } = req.body;
    const post = postRequests.update.parse(req.body);
    const updatedPost = await PostService.update(email, password, postId, post);
    res.json(updatedPost);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, postId } = req.body;
    const deletedPost = await PostService.deletePost(email, password, postId);
    res.json(deletedPost);
  };
}
