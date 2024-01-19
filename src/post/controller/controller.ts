import { Response, Request, Router, NextFunction } from "express";
import { PostService } from "../service/service";
import { postRequests } from "./requests/postRequests";
import { getPostsByFilter } from "../repository/getPostsByFilter/getPostsByFilter";
import moment from "moment";

export class PostController {
  public router = Router();
  constructor() {
    this.router.post("/post", this.create);
    this.router.get("/post/:paginationIdx", this.get);
    this.router.patch("/post", this.update);
    this.router.delete("/post", this.delete);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const post = await postRequests.create.parseAsync(req.body);
    const createdPost = await PostService.create(token, post);
    res.json(createdPost);
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { tags, author, posted, sortBy } = req.query; // author is profile name
    const { paginationIdx } = req.params;

    const filter = postRequests.filter.parse({
      tags,
      author,
      posted: (posted as string[])?.map((p) => Number(p)), //timestamp
      sortBy,
    });

    const posts = await getPostsByFilter(token, filter);

    res.json(
      posts.slice(Number(paginationIdx) * 20, Number(paginationIdx) * 20 + 20)
    );
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const post = postRequests.update.parse(req.body);
    const updatedPost = await PostService.update(token, postId, post);
    res.json(updatedPost);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const deletedPost = await PostService.deletePost(token, postId);
    res.json(deletedPost);
  };
}
